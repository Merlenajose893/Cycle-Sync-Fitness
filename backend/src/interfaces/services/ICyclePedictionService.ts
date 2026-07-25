import type { CyclePhase } from "../../constants/health.constant.js";

export interface ICyclePredictionResult {
    currentCycleDay: number;
    currentPhase: CyclePhase
    averageCycleLength: number;
    averagePeriodLength: number;
    nextPeriodDate: Date;
    fertileWindow: {
        startDate: Date;
        endDate: Date;
        ovulationDate: Date;
    };
}
export interface ICyclePredictionService {
    getCyclePrediction(userId:string):Promise<ICyclePredictionResult>
}