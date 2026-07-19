import type { AIPlanInputs, IAIPlan } from "../../models/AIPlan.js";

export interface IAIPlanService{
    generatePlans(userId:string,inputs:AIPlanInputs):Promise<IAIPlan|null>
}