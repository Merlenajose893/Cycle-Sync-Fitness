import mongoose, { Types, Document } from "mongoose";
import { FlowIntensity } from "../constants/health.constant.js";
export interface ICycleLog extends Document {
    userId: Types.ObjectId;
    startDate: Date;
    endDate?: Date;
    flowIntensity: FlowIntensity;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const CycleLog: mongoose.Model<ICycleLog, {}, {}, {}, mongoose.Document<unknown, {}, ICycleLog, {}, mongoose.DefaultSchemaOptions> & ICycleLog & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICycleLog>;
//# sourceMappingURL=CycleLog.d.ts.map