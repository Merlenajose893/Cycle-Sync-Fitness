import mongoose, { Types, Document } from "mongoose";
import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
export interface ITrainerAssignment extends Document {
    userId: Types.ObjectId;
    trainerId: Types.ObjectId;
    paymentId: Types.ObjectId;
    packageId: Types.ObjectId;
    assignmentStatus: TrainerAssignmentStatus;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const TrainerAssignment: mongoose.Model<ITrainerAssignment, {}, {}, {}, mongoose.Document<unknown, {}, ITrainerAssignment, {}, mongoose.DefaultSchemaOptions> & ITrainerAssignment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITrainerAssignment>;
//# sourceMappingURL=TrainerAssignment.d.ts.map