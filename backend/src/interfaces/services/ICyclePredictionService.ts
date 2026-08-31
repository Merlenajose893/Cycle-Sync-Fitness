import type { CyclePhase } from "../../constants/health.constant.ts";

export interface CyclePredictionResult {
  currentPhase: CyclePhase;
  currentCycleDay: number;
  averageCycleLength: number;
  nextPeriodStartDate: Date;
  nextPeriodEndDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  ovulationDate: Date;
}

export interface ICyclePredictionService {
  predictCycle(userId: string): Promise<CyclePredictionResult>;
}
