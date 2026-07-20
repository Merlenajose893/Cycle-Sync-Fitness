import type { PlanStatus } from "../../constants/aiPlan.js";
import type { AIPlanInputs, IAIPlan } from "../../models/AIPlan.js";

export interface IAIPlanService{
    generatePlans(userId:string,inputs:AIPlanInputs):Promise<IAIPlan|null>
    getActivePlan(userId:string):Promise<IAIPlan|null>;
    getPlanHistory(userId:string):Promise<IAIPlan[]>;
    updatePlanStatus(planId:string,status:PlanStatus):Promise<IAIPlan>;
    deletePlan(planId:string):Promise<void>;
}