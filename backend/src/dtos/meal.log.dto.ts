import type { MealType } from "../constants/food.constants.ts";

export interface FoodITemDTO{
    name:string;
    quantity:number;
    unit:string;
    calories:number;
    protein:number;
    carbs:number;
    fat:number;
}
export interface LogMealDTO{
    mealType:MealType;
    food:FoodITemDTO[]
}

export interface DailyTargetDTO{
    calories:number;
    protein:number;
    carbs:number;
    fats:number;
}