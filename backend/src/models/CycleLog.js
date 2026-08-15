import mongoose, { Schema, Types, Document } from "mongoose";
import { FlowIntensity } from "../constants/health.constant.js";
const CycleLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    flowIntensity: {
        type: String,
        enum: Object.values(FlowIntensity),
        required: true
    },
    notes: {
        type: String,
    }
}, { timestamps: true });
export const CycleLog = mongoose.model("CycleLog", CycleLogSchema);
//# sourceMappingURL=CycleLog.js.map