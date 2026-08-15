import { z } from "zod";
export declare const generatePlanSchema: z.ZodObject<{
    goal: z.ZodString;
    fitnessLevel: z.ZodString;
    daysPerWeek: z.ZodNumber;
    dietPreference: z.ZodString;
}, z.core.$strip>;
export declare const updatePlanStatusSchema: z.ZodObject<{
    status: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=aiPlan.validator.d.ts.map