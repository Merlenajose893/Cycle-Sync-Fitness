import type { PlanStatus } from "../constants/aiPlan.ts";
import type { PlanSummary,WorkoutDay,Meal,Recommendation, AIPlanInputs } from "../models/AIPlan.ts";
export interface AiPlanDTO{
    summary:PlanSummary,
    workoutPlan:WorkoutDay[],
    mealPlan:Meal[],
    recommendations:Recommendation
}

export interface CreateAIPlanDTO{
    userId:string;
    status:PlanStatus;
    inputs:AIPlanInputs;
    summary:PlanSummary;
    workoutPlan:WorkoutDay[];
    mealPlan:Meal[];
    recommendations:Recommendation
}

export interface AIPlanResponseDTO{
    id:string;
    userId:string;
    status:PlanStatus;
    inputs:AIPlanInputs;
    summary:PlanSummary;
    workoutPlan:WorkoutDay[];
    mealPlan:Meal[];
    recommendations:Recommendation;
    createdAt:Date;
    updatedAt:Date;
}