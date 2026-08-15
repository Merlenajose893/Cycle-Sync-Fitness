import mongoose, { Document, Types } from "mongoose";
import { HealthMilestoneType } from "../constants/health.constant.js";
export interface IHealthMilestone extends Document {
    userId: Types.ObjectId;
    milestoneType: HealthMilestoneType;
    title: string;
    description: string;
    badgeIcon: string;
    achievedAt: Date;
}
export declare const HealthMilestone: mongoose.Model<IHealthMilestone, {}, {}, {}, mongoose.Document<unknown, {}, IHealthMilestone, {}, mongoose.DefaultSchemaOptions> & IHealthMilestone & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IHealthMilestone>;
//# sourceMappingURL=HealthMilestone.d.ts.map