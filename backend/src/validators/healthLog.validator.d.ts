import { z } from "zod";
import { Mood, PhysicalSymptom } from "../constants/health.constant.js";
export declare const bodyMeasurementsSchema: z.ZodObject<{
    waistCm: z.ZodOptional<z.ZodNumber>;
    hipsCm: z.ZodOptional<z.ZodNumber>;
    chestCm: z.ZodOptional<z.ZodNumber>;
    thighsCm: z.ZodOptional<z.ZodNumber>;
    armsCm: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const createHealthLogSchema: z.ZodObject<{
    date: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    waterIntakeMl: z.ZodOptional<z.ZodNumber>;
    waterTargetMl: z.ZodOptional<z.ZodNumber>;
    weightKg: z.ZodOptional<z.ZodNumber>;
    bodyMeasurements: z.ZodOptional<z.ZodObject<{
        waistCm: z.ZodOptional<z.ZodNumber>;
        hipsCm: z.ZodOptional<z.ZodNumber>;
        chestCm: z.ZodOptional<z.ZodNumber>;
        thighsCm: z.ZodOptional<z.ZodNumber>;
        armsCm: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    energyLevel: z.ZodOptional<z.ZodNumber>;
    moods: z.ZodOptional<z.ZodArray<z.ZodEnum<typeof Mood>>>;
    physicalSymptoms: z.ZodOptional<z.ZodArray<z.ZodEnum<typeof PhysicalSymptom>>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const addWaterSchema: z.ZodObject<{
    amountMl: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=healthLog.validator.d.ts.map