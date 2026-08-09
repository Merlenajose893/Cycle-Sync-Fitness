import { z } from "zod";
import { Mood, PhysicalSymptom } from "../constants/health.constant.js";

export const bodyMeasurementsSchema = z.object({
  waistCm: z.number().positive().optional(),
  hipsCm: z.number().positive().optional(),
  chestCm: z.number().positive().optional(),
  thighsCm: z.number().positive().optional(),
  armsCm: z.number().positive().optional(),
});

export const createHealthLogSchema = z.object({
  date: z.string().or(z.date()),
  waterIntakeMl: z.number().min(0).optional(),
  waterTargetMl: z.number().min(0).optional(),
  weightKg: z.number().positive().optional(),
  bodyMeasurements: bodyMeasurementsSchema.optional(),
  energyLevel: z.number().min(1).max(10).optional(),
  moods: z.array(z.nativeEnum(Mood)).optional(),
  physicalSymptoms: z.array(z.nativeEnum(PhysicalSymptom)).optional(),
  notes: z.string().max(500).optional(),
});

export const addWaterSchema = z.object({
  amountMl: z.number().positive("Water amount must be positive"),
});
