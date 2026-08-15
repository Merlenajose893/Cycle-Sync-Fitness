import { z } from "zod";
import { MealType } from "../constants/food.constants.js";
export declare const foodITemSchema: z.ZodObject<{
    name: z.ZodString;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    calories: z.ZodNumber;
    proteins: z.ZodNumber;
    fats: z.ZodNumber;
    carbs: z.ZodNumber;
}, z.core.$strip>;
export declare const logMealSchema: z.ZodObject<{
    mealType: z.ZodEnum<{
        BREAKFAST: MealType.BREAKFAST;
        LUNCH: MealType.LUNCH;
        SNACK: MealType.SNACK;
        DINNER: MealType.DINNER;
    }>;
    foods: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        unit: z.ZodString;
        calories: z.ZodNumber;
        proteins: z.ZodNumber;
        fats: z.ZodNumber;
        carbs: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const dailyTargetSchema: z.ZodObject<{
    calories: z.ZodNumber;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fat: z.ZodOptional<z.ZodNumber>;
    fats: z.ZodOptional<z.ZodNumber>;
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=meallog.validator.d.ts.map