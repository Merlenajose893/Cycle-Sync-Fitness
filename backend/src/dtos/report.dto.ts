export type ReportRange = "week" | "month" | "3months";

export interface ReportSummary {
  totalCalories: number;
  averageDailyCalories: number;
  calorieTargetAdherence: number;

  totalWorkoutSessions: number;
  totalWorkoutVolume: number;
  totalWorkoutSets: number;
  workoutConsistency: number;

  startingWeight: number | null;
  currentWeight: number | null;
  weightChange: number | null;
}

export interface CalorieDataPoint {
  date: string;
  caloriesConsumed: number;
  calorieTarget: number;
}

export interface MacroDataPoint {
  date: string;
  protein: number;
  carbohydrates: number;
  fats: number;
}

export interface WorkoutDataPoint {
  date: string;
  totalVolume: number;
  totalSets: number;
  workoutCompleted: boolean;
}

export interface WeightCycleDataPoint {
  date: string;
  weight: number | null;
  cycleDay: number | null;
  cyclePhase: string | null;
}

export interface ReportAnalytics {
  range: ReportRange;
  startDate: string;
  endDate: string;

  summary: ReportSummary;

  calorieSeries: CalorieDataPoint[];
  macroSeries: MacroDataPoint[];
  workoutSeries: WorkoutDataPoint[];
  weightCycleSeries: WeightCycleDataPoint[];
}