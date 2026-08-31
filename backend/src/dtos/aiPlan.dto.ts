import type { PlanSummary,WorkoutDay,Meal,Recommendation } from "../models/AIPlan.ts";
export interface AiPlanDTO{
    summary:PlanSummary,
    workoutPlan:WorkoutDay[],
    mealPlan:Meal[],
    recommendations:Recommendation
}