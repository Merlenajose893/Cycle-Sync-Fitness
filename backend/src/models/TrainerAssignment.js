import mongoose, { Schema, Types, Document } from "mongoose";
import { TrainerAssignmentStatus } from "../constants/trainerassign.js";
const TrainerAssignmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    trainerId: {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
        required: true
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    packageId: {
        type: Schema.Types.ObjectId,
        ref: "TrainerPackage",
        required: true
    },
    assignmentStatus: {
        type: String,
        enum: Object.values(TrainerAssignmentStatus),
        default: TrainerAssignmentStatus.ACTIVE
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });
export const TrainerAssignment = mongoose.model('TrainerAssignment', TrainerAssignmentSchema);
//# sourceMappingURL=TrainerAssignment.js.map