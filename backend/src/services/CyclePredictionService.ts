import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.ts";
import type { ICyclePredictionService, CyclePredictionResult } from "../interfaces/services/ICyclePredictionService.ts";
import { CyclePhase } from "../constants/health.constant.ts";

@injectable()
export class CyclePredictionService implements ICyclePredictionService {
  constructor(
    @inject(TOKENS.ICycleLogRepository)
    private cycleLogRepository: ICycleLogRepository
  ) {}

  async predictCycle(userId: string): Promise<CyclePredictionResult> {
    const recentCycles = await this.cycleLogRepository.findRecentCycles(userId, 6);

    let averageCycleLength = 28; // Default standard length
    let lastPeriodStart = new Date();

    if (recentCycles.length > 0 && recentCycles[0]) {
      lastPeriodStart = new Date(recentCycles[0].startDate);

      if (recentCycles.length > 1) {
        let totalDays = 0;
        let intervals = 0;
        for (let i = 0; i < recentCycles.length - 1; i++) {
          const curr = recentCycles[i];
          const prev = recentCycles[i + 1];
          if (curr && prev) {
            const currentStart = new Date(curr.startDate).getTime();
            const prevStart = new Date(prev.startDate).getTime();
            const diffDays = Math.round((currentStart - prevStart) / (1000 * 60 * 60 * 24));
            if (diffDays > 15 && diffDays < 45) { // Sanity check for valid cycle range
              totalDays += diffDays;
              intervals++;
            }
          }
        }
        if (intervals > 0) {
          averageCycleLength = Math.round(totalDays / intervals);
        }
      }
    }

    const today = new Date();
    const diffTime = today.getTime() - lastPeriodStart.getTime();
    const currentCycleDay = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);

    // Phase detection based on cycle day
    let currentPhase: CyclePhase = CyclePhase.MENSTRUAL;
    if (currentCycleDay <= 5) {
      currentPhase = CyclePhase.MENSTRUAL;
    } else if (currentCycleDay <= 13) {
      currentPhase = CyclePhase.FOLLICULAR;
    } else if (currentCycleDay <= 15) {
      currentPhase = CyclePhase.OVULATORY;
    } else {
      currentPhase = CyclePhase.LUTEAL;
    }

    // Calculations for next cycle dates
    const nextPeriodStartDate = new Date(lastPeriodStart);
    nextPeriodStartDate.setDate(nextPeriodStartDate.getDate() + averageCycleLength);

    const nextPeriodEndDate = new Date(nextPeriodStartDate);
    nextPeriodEndDate.setDate(nextPeriodEndDate.getDate() + 5);

    // Ovulation is typically 14 days before next period
    const ovulationDate = new Date(nextPeriodStartDate);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 4);

    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 2);

    return {
      currentPhase,
      currentCycleDay,
      averageCycleLength,
      nextPeriodStartDate,
      nextPeriodEndDate,
      fertileWindowStart,
      fertileWindowEnd,
      ovulationDate,
    };
  }
}
