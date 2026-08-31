import type { Mood, PhysicalSymptom } from "../constants/health.constant.ts";
import type { IBodyMeasurements } from "../models/DailyHealthLog.ts";

export interface CreateHealthLogDTO{
    date:Date;
    waterIntakeML?:number;
    waterTargetML?:number;
    weightKg?:number;
    bodyMeasurements?:IBodyMeasurements,
    energyLevel?:number;
    moods?:Mood[],
    physicalSymptoms?:PhysicalSymptom[],
    notes?:string;

}

export type UpdateDailyHealthLogDTO = Partial<CreateHealthLogDTO>;
export interface AddWaterDTO {
  amountMl: number;
}
