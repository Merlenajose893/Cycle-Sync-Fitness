import { z } from "zod";
import { MealType } from "../constants/food.constants.js";
export const foodITemSchema = z.object({
    name: z.string().min(2, "Food name is required"),
    quantity: z.number().positive(),
    unit: z.string().min(1),
    calories: z.number().min(0),
    proteins: z.number().min(0),
    fats: z.number().min(0),
    carbs: z.number().min(0)
});
export const logMealSchema = z.object({
    mealType: z.enum([
        MealType.BREAKFAST,
        MealType.LUNCH,
        MealType.SNACK,
        MealType.DINNER
    ]),
    foods: z
        .array(foodITemSchema)
        .min(1, "At least one food item required")
});
export const dailyTargetSchema = z.object({
    calories: z
        .number()
        .positive(),
    protein: z
        .number()
        .min(0),
    carbs: z
        .number()
        .min(0),
    fat: z
        .number()
        .min(0)
        .optional(),
    fats: z
        .number()
        .min(0)
        .optional(),
    date: z
        .string()
        .optional()
});
//# sourceMappingURL=meallog.validator.js.map