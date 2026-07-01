import {z} from "zod"
export const updateBodyDetailsSchema=z.object({
    height:z.coerce.number().positive("Height must be greater than 0"),
    weight:z.coerce.number().positive("Weight must be greater than 0"),
    dateOfBirth:z.coerce.date(),
    biologicalSex:z.string().min(1,"Biological sex is required")
});
export const updateCycleSetupSchema=z.object({
    averageCycleLength:z.number().optional(),
    averagePeriodLength:z.number().positive().optional(),
    lastPeriodStart:z.date(),
    birthControl:z.string().optional()
})

export const updateGoalsSchema=z.object({
    primaryGoal:z.enum(["weight_loss","muscle_gain","hormone_balance","general_health"]).optional(),
    targetWeight:z.number().positive().optional(),
    activityLevel:z.enum(["sedentary","lightActive","moderatelyActive"]).optional()
})