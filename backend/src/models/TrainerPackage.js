import mongoose, { Schema, Types, Document, model } from "mongoose";
const TrainerPackageSchema = new Schema({
    trainerId: {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
        required: true,
    },
    packageName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    durationDays: {
        type: Number,
        required: true,
        min: 7,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    features: {
        type: [String],
        required: true,
        default: [],
    },
    maxClients: {
        type: Number,
        min: 1,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
export const TrainerPackage = mongoose.model("TrainerPackage", TrainerPackageSchema);
//# sourceMappingURL=TrainerPackage.js.map