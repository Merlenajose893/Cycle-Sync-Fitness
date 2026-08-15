import { z } from "zod";
export declare const updateUserProfileSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    bodyDetails: z.ZodOptional<z.ZodObject<{
        height: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
        dateOfBirth: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        biologicalSex: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    cycleSetUp: z.ZodOptional<z.ZodObject<{
        averageCycleLength: z.ZodOptional<z.ZodNumber>;
        averagePeriodLength: z.ZodOptional<z.ZodNumber>;
        lastPeriodStart: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        birthControl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    goals: z.ZodOptional<z.ZodObject<{
        primaryGoal: z.ZodOptional<z.ZodEnum<{
            weight_loss: "weight_loss";
            muscle_gain: "muscle_gain";
            hormone_balance: "hormone_balance";
            general_health: "general_health";
        }>>;
        targetWeight: z.ZodOptional<z.ZodNumber>;
        activityLevel: z.ZodOptional<z.ZodEnum<{
            sedentary: "sedentary";
            lightActive: "lightActive";
            moderatelyActive: "moderatelyActive";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=userprofile.validator.d.ts.map