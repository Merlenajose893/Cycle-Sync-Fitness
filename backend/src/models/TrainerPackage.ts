import { Schema, Types, Document, model } from "mongoose";

export interface ITrainerPackage extends Document {
    trainerId: Types.ObjectId;
    packageName: string;
    description: string;
    durationDays: number;
    price: number;
    features: string[];
    maxClients?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TrainerPackageSchema = new Schema<ITrainerPackage>(
    {
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
    },
    {
        timestamps: true,
    }
);

export default model<ITrainerPackage>(
    "TrainerPackage",
    TrainerPackageSchema
);