export type MealType = 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';

export interface FoodItem {
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
}

export interface LogMealPayload {
    mealType: MealType;
    foods: FoodItem[];
}

export interface DailyTargetPayload {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface MealLog {
    _id?: string;
    userId?: string;
    date?: string;
    mealType: MealType;
    foods: FoodItem[];
    totalCalories?: number;
    totalProtein?: number;
    totalCarbs?: number;
    totalFat?: number;
}

export interface DayLogSummary {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
}

export interface DayLogResponse {
    date: string;
    target: DailyTargetPayload;
    meals: MealLog[];
    summary: DayLogSummary;
}

export interface WeekLogResponse {
    startDate: string;
    days: DayLogResponse[];
}
