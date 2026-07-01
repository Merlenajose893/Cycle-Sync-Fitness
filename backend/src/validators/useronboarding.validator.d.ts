import { z } from "zod";
export declare const updateBodyDetailsSchema: z.ZodObject<{
    height: z.ZodNumber;
    weight: z.ZodNumber;
    dateOfBirth: z.ZodDate;
    biologicalSex: z.ZodString;
}, z.core.$strip>;
export declare const updateCycleSetupSchema: z.ZodObject<{
    averageCycleLength: z.ZodOptional<z.ZodNumber>;
    averagePeriodLength: z.ZodOptional<z.ZodNumber>;
    lastPeriodStart: z.ZodDate;
    birthControl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateGoalsSchema: z.ZodObject<{
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
}, z.core.$strip>;
//# sourceMappingURL=useronboarding.validator.d.ts.map