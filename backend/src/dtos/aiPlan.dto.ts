import type { PlanSummary,WorkoutDay,Meal,Recommendation } from "../models/AIPlan.js";
export interface AiPlanDTO{
    plan:PlanSummary,
    workout:WorkoutDay[],
    meal:Meal[],
    recommendation:Recommendation
}