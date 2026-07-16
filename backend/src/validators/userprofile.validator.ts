import { z } from "zod";

export const updateUserProfileSchema = z.object({
    firstName: z.string().trim().min(1).optional(),

    lastName: z.string().trim().min(1).optional(),

    bio: z.string().trim().optional(),

    bodyDetails: z.object({
        height: z.number().positive().optional(),
        weight: z.number().positive().optional(),
        dateOfBirth: z.coerce.date().optional(),
        biologicalSex: z.string().optional(),
    }).optional(),

    cycleSetUp: z.object({
        averageCycleLength: z.number().positive().optional(),
        averagePeriodLength: z.number().positive().optional(),
        lastPeriodStart: z.coerce.date().optional(),
        birthControl: z.string().optional(),
    }).optional(),

    goals: z.object({
        primaryGoal: z.enum([
            "weight_loss",
            "muscle_gain",
            "hormone_balance",
            "general_health",
        ]).optional(),

        targetWeight: z.number().positive().optional(),

        activityLevel: z.enum([
            "sedentary",
            "lightActive",
            "moderatelyActive",
        ]).optional(),
    }).optional(),
});