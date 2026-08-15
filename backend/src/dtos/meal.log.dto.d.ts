import type { MealType } from "../constants/food.constants.js";
export interface FoodITemDTO {
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}
export interface LogMealDTO {
    mealType: MealType;
    food: FoodITemDTO[];
}
export interface DailyTargetDTO {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}
//# sourceMappingURL=meal.log.dto.d.ts.map