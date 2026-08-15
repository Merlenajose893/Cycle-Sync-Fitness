import mongoose, { Types, Document } from "mongoose";
import { PlanStatus, Goal, FitnessLevel, DietPreference, WorkoutType, MealType, WeekDay } from "../constants/aiPlan.js";
export interface AIPlanInputs {
    goal: Goal;
    fitnessLevel: FitnessLevel;
    daysPerWeek: number;
    dietPreference: DietPreference;
}
export interface PlanSummary {
    dailyCalories: number;
    protein: number;
    carbs: number;
    fat: number;
    waterIntake: number;
    sleepHours: number;
}
export interface Warmup {
    title: string;
    description: string;
    duration: number;
}
export interface Cooldown {
    title: string;
    description: string;
    duration: number;
}
export interface Exercise {
    name: string;
    muscleGroup: string;
    workoutType: WorkoutType;
    sets: number;
    reps: string;
    rest: number;
    tip?: string;
}
export interface WorkoutDay {
    day: WeekDay;
    title: string;
    duration: number;
    warmup: Warmup;
    exercises: Exercise[];
    cooldown: Cooldown;
}
export interface Meal {
    mealType: MealType;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    notes?: string;
}
export interface MealDay {
    day: WeekDay;
    meals: Meal[];
}
export interface Recommendation {
    recovery: string;
    supplements?: string[];
    cycleAdvice?: string;
    notes?: string;
}
export interface IAIPlan extends Document {
    userId: Types.ObjectId;
    status: PlanStatus;
    inputs: AIPlanInputs;
    summary: PlanSummary;
    workoutPlan: WorkoutDay[];
    mealPlan: MealDay[];
    recommendations: Recommendation;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IAIPlan, {}, {}, {}, mongoose.Document<unknown, {}, IAIPlan, {}, mongoose.DefaultSchemaOptions> & IAIPlan & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAIPlan>;
export default _default;
//# sourceMappingURL=AIPlan.d.ts.map