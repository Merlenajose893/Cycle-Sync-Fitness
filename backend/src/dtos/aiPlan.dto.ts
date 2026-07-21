import type { PlanSummary,WorkoutDay,Meal,Recommendation } from "../models/AIPlan.js";
export interface AiPlanDTO{
    summary:PlanSummary,
    workoutPlan:WorkoutDay[],
    mealPlan:Meal[],
    recommendations:Recommendation
}