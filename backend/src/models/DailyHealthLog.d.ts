import { Types, Document } from "mongoose";
import { Mood, PhysicalSymptom } from "../constants/health.constant.js";
export interface IBodyMeasurements {
    waistCm?: number;
    hipsCm?: number;
    chestCm?: number;
    thighsCm?: number;
    armsCm?: number;
    bodyFatPercentage?: number;
}
export interface IDailyHealthLog extends Document {
    userId: Types.ObjectId;
    date: Date;
    waterIntakeMl: number;
    waterTargetMl: number;
    weightKg?: number;
    bodyMeasurements?: IBodyMeasurements;
    energyLevel?: number;
    moods?: Mood[];
    physicalSymptoms: PhysicalSymptom[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const DailyHealthLog: import("mongoose").Model<IDailyHealthLog, {}, {}, {}, Document<unknown, {}, IDailyHealthLog, {}, import("mongoose").DefaultSchemaOptions> & IDailyHealthLog & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IDailyHealthLog>;
//# sourceMappingURL=DailyHealthLog.d.ts.map