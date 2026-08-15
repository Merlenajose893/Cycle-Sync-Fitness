import { z } from "zod";
export const generatePlanSchema = z.object({
    goal: z.string().min(1, "Goal is required"),
    fitnessLevel: z.string().min(1, "Fitness level is required"),
    daysPerWeek: z.number().int().min(1).max(7),
    dietPreference: z.string().min(1, "Diet preference is required"),
});
export const updatePlanStatusSchema = z.object({
    status: z.string().min(1, "Status is required"),
});
//# sourceMappingURL=aiPlan.validator.js.map