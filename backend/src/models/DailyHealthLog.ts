import { Schema, model, Types, Document, SchemaType } from "mongoose";
import { Mood, PhysicalSymptom } from "../constants/health.constant.js";
// import type { Mood, PhysicalSymptom } from "../constants/health.constant.js";

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

const BodyMeasurementsSchema = new Schema<IBodyMeasurements>(
  {
    waistCm: {
      type: Number,
    },
    hipsCm: {
      type: Number,
    },
    chestCm: {
      type: Number,
    },
    thighsCm: {
      type: Number,
    },
    armsCm: {
      type: Number,
    },
    bodyFatPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { _id: false }
);

const DailyHealthLogSchema = new Schema<IDailyHealthLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    waterIntakeMl: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    waterTargetMl: {
      type: Number,
      required: true,
      default: 2000,
      min: 0,
    },

    weightKg: {
      type: Number,
      min: 0,
    },

    bodyMeasurements: {
      type: BodyMeasurementsSchema,
    },

    energyLevel: {
      type: Number,
      min: 1,
      max: 10,
    },

    moods: [
      {
        type: String,
        enum: Object.values(Mood),
      },
    ],

    physicalSymptoms: [
      {
        type: String,
        enum: Object.values(PhysicalSymptom),
      },
    ],

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

DailyHealthLogSchema.index({userId:1,date:1},{unique:true})


export const DailyHealthLog = model<IDailyHealthLog>(
  "DailyHealthLog",
  DailyHealthLogSchema
);