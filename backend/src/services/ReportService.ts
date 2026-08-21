import { inject, injectable } from "tsyringe";
import type {
  ReportRange,
  ReportAnalytics,
  CalorieDataPoint,
  MacroDataPoint,
  WorkoutDataPoint,
  WeightCycleDataPoint,
  ReportSummary,
} from "../dtos/report.dto.js";
import type { IReportService } from "../interfaces/services/IReportService.js";
import { TOKENS } from "../container/tokens.js";
import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.js";
import type { IWorkoutLogRepository } from "../interfaces/repositories/IWorkoutLogRepository.js";
import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import { CyclePhase } from "../constants/health.constant.js";

@injectable()
export class ReportService implements IReportService {
  constructor(
    @inject(TOKENS.IMealLogRepository)
    private meallogrepository: IMealLogRepository,
    @inject(TOKENS.IWorkoutLogRepository)
    private workoutlogrepository: IWorkoutLogRepository,
    @inject(TOKENS.IDailyHealthLogRepository)
    private dailyhealthlogrepository: IDailyHealthLogRepository,
    @inject(TOKENS.ICycleLogRepository)
    private cyclelogrepository: ICycleLogRepository
  ) {}

  generateUserReport = async (
    userId: string,
    range: ReportRange
  ): Promise<ReportAnalytics> => {
    const { startDate, endDate } = this.getDateRange(range);

    const [mealLogs, workoutLogs, healthLogs, cycleLogs] = await Promise.all([
      this.meallogrepository.findByUserDateRange(userId, startDate, endDate),
      this.workoutlogrepository.findByUserDateRange(userId, startDate, endDate),
      this.dailyhealthlogrepository.findByDateRange(userId, startDate, endDate),
      this.cyclelogrepository.findByUser(userId),
    ]);

    const daysList = this.generateDaysList(startDate, endDate);

    const calorieSeries: CalorieDataPoint[] = [];
    const macroSeries: MacroDataPoint[] = [];
    const workoutSeries: WorkoutDataPoint[] = [];
    const weightCycleSeries: WeightCycleDataPoint[] = [];

    // Sort cycle logs descending by startDate for fast lookup
    const sortedCycleLogs = [...cycleLogs].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    for (const d of daysList) {
      const dateStr = d.toISOString().substring(0, 10);

      // 1. Meal Log aggregation
      const dayMealLog = mealLogs.find((m) => this.isSameDay(new Date(m.date), d));
      let dayCalories = 0;
      let dayTarget = 2000;
      let dayProtein = 0;
      let dayCarbs = 0;
      let dayFat = 0;

      if (dayMealLog) {
        dayTarget = dayMealLog.dailyTarget?.calories || 2000;
        if (dayMealLog.meals && Array.isArray(dayMealLog.meals)) {
          for (const meal of dayMealLog.meals) {
            dayCalories += meal.totalCalories || 0;
            dayProtein += meal.totalProtein || 0;
            dayCarbs += meal.totalCarbs || 0;
            dayFat += meal.totalFat || 0;
          }
        }
      }

      calorieSeries.push({
        date: dateStr,
        caloriesConsumed: Math.round(dayCalories),
        calorieTarget: Math.round(dayTarget),
      });

      macroSeries.push({
        date: dateStr,
        protein: Math.round(dayProtein),
        carbohydrates: Math.round(dayCarbs),
        fats: Math.round(dayFat),
      });

      // 2. Workout Log aggregation
      const dayWorkouts = workoutLogs.filter((w) =>
        this.isSameDay(new Date(w.date), d)
      );
      let dayVolume = 0;
      let daySets = 0;

      for (const w of dayWorkouts) {
        dayVolume += w.totalVolumeKg || 0;
        daySets += w.totalSetsCompleted || 0;
      }

      workoutSeries.push({
        date: dateStr,
        totalVolume: Math.round(dayVolume),
        totalSets: daySets,
        workoutCompleted: dayWorkouts.length > 0,
      });

      // 3. Daily Health Log (Weight) aggregation
      const dayHealthLog = healthLogs.find((h) =>
        this.isSameDay(new Date(h.date), d)
      );
      const weight = dayHealthLog?.weightKg ?? null;

      // 4. Cycle Day & Phase calculation
      const { cycleDay, cyclePhase } = this.calculateCyclePhaseForDate(
        d,
        sortedCycleLogs
      );

      weightCycleSeries.push({
        date: dateStr,
        weight,
        cycleDay,
        cyclePhase,
      });
    }

    // Summary calculation
    const totalCalories = calorieSeries.reduce(
      (acc, curr) => acc + curr.caloriesConsumed,
      0
    );
    const averageDailyCalories =
      daysList.length > 0 ? Math.round(totalCalories / daysList.length) : 0;

    const daysWithAdherence = calorieSeries.filter(
      (c) => c.caloriesConsumed >= c.calorieTarget * 0.85 && c.caloriesConsumed <= c.calorieTarget * 1.15
    ).length;
    const calorieTargetAdherence =
      daysList.length > 0 ? Math.round((daysWithAdherence / daysList.length) * 100) : 0;

    const completedWorkouts = workoutSeries.filter((w) => w.workoutCompleted);
    const totalWorkoutSessions = completedWorkouts.length;
    const totalWorkoutVolume = workoutSeries.reduce(
      (acc, curr) => acc + curr.totalVolume,
      0
    );
    const totalWorkoutSets = workoutSeries.reduce(
      (acc, curr) => acc + curr.totalSets,
      0
    );
    const workoutConsistency =
      daysList.length > 0 ? Math.round((totalWorkoutSessions / daysList.length) * 100) : 0;

    const weightsLogged = weightCycleSeries
      .filter((w) => w.weight !== null)
      .map((w) => w.weight as number);

    const startingWeight: number | null = weightsLogged.length > 0 ? (weightsLogged[0] ?? null) : null;
    const currentWeight: number | null =
      weightsLogged.length > 0 ? (weightsLogged[weightsLogged.length - 1] ?? null) : null;
    const weightChange: number | null =
      startingWeight !== null && currentWeight !== null
        ? Math.round((currentWeight - startingWeight) * 10) / 10
        : null;

    const summary: ReportSummary = {
      totalCalories,
      averageDailyCalories,
      calorieTargetAdherence,
      totalWorkoutSessions,
      totalWorkoutVolume,
      totalWorkoutSets,
      workoutConsistency,
      startingWeight,
      currentWeight,
      weightChange,
    };

    return {
      range,
      startDate: startDate.toISOString().substring(0, 10),
      endDate: endDate.toISOString().substring(0, 10),
      summary,
      calorieSeries,
      macroSeries,
      workoutSeries,
      weightCycleSeries,
    };
  };

  exportUser = async (userId: string, range: ReportRange): Promise<string> => {
    const report = await this.generateUserReport(userId, range);

    const headers = [
      "Date",
      "Calories Consumed",
      "Calorie Target",
      "Protein (g)",
      "Carbohydrates (g)",
      "Fats (g)",
      "Workout Volume (kg)",
      "Workout Sets",
      "Workout Completed",
      "Weight (kg)",
      "Cycle Day",
      "Cycle Phase",
    ];

    const rows: string[] = [headers.join(",")];

    for (let i = 0; i < report.calorieSeries.length; i++) {
      const cal = report.calorieSeries[i];
      const macro = report.macroSeries[i];
      const workout = report.workoutSeries[i];
      const weightCycle = report.weightCycleSeries[i];

      if (!cal || !macro || !workout || !weightCycle) continue;

      const row = [
        cal.date,
        cal.caloriesConsumed,
        cal.calorieTarget,
        macro.protein,
        macro.carbohydrates,
        macro.fats,
        workout.totalVolume,
        workout.totalSets,
        workout.workoutCompleted ? "Yes" : "No",
        weightCycle.weight ?? "",
        weightCycle.cycleDay ?? "",
        weightCycle.cyclePhase ?? "",
      ].join(",");

      rows.push(row);
    }

    return rows.join("\n");
  };

  private getDateRange(range: ReportRange): { startDate: Date; endDate: Date } {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    if (range === "week") {
      startDate.setDate(startDate.getDate() - 6);
    } else if (range === "month") {
      startDate.setDate(startDate.getDate() - 29);
    } else if (range === "3months") {
      startDate.setDate(startDate.getDate() - 89);
    }

    return { startDate, endDate };
  }

  private generateDaysList(startDate: Date, endDate: Date): Date[] {
    const days: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate()
    );
  }

  private calculateCyclePhaseForDate(
    date: Date,
    sortedCycleLogs: any[]
  ): { cycleDay: number | null; cyclePhase: string | null } {
    if (!sortedCycleLogs || sortedCycleLogs.length === 0) {
      return { cycleDay: null, cyclePhase: null };
    }

    const matchingLog = sortedCycleLogs.find(
      (log) => new Date(log.startDate) <= date
    );

    if (!matchingLog) {
      return { cycleDay: null, cyclePhase: null };
    }

    const cycleStart = new Date(matchingLog.startDate);
    const diffTime = date.getTime() - cycleStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const cycleDay = diffDays > 0 ? ((diffDays - 1) % 28) + 1 : 1;

    let cyclePhase: string = CyclePhase.MENSTRUAL;
    if (cycleDay <= 5) {
      cyclePhase = CyclePhase.MENSTRUAL;
    } else if (cycleDay <= 13) {
      cyclePhase = CyclePhase.FOLLICULAR;
    } else if (cycleDay <= 15) {
      cyclePhase = CyclePhase.OVULATORY;
    } else {
      cyclePhase = CyclePhase.LUTEAL;
    }

    return { cycleDay, cyclePhase };
  }
}