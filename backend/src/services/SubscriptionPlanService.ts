import { inject, injectable } from "tsyringe";
import type { CreateSubscriptionPlanDTO, UpdateSubscriptionPlanDTO } from "../dtos/subscriptionPlandto.js";
import type { ISubscriptionPlanService } from "../interfaces/services/ISubscriptionPlanService.js";
import type { ISubscriptionPlan } from "../models/SubscriptionPlan.js";
import { TOKENS } from "../container/tokens.js";
@injectable()
export class SubscriptionPlanService implements ISubscriptionPlanService{
    constructor(@inject(TOKENS))
    {

    }
    createPlan=async(data: CreateSubscriptionPlanDTO): Promise<ISubscriptionPlan> =>{
        
    }
    getPlanById=async(id: string): Promise<ISubscriptionPlan>=> {
        
    }
    updatePlan=async(id: string, data: UpdateSubscriptionPlanDTO): Promise<ISubscriptionPlan | null> =>{
        
    }
    getPlanByCode=async(code: string): Promise<ISubscriptionPlan> =>{
        
    }
    getAllPlans=async(): Promise<ISubscriptionPlan[]> =>{
        
    }
    deactivatePlan=async(id: string): Promise<ISubscriptionPlan | null> =>{
        
    }
    getActivePlans=async(): Promise<ISubscriptionPlan[]> =>{
        
    }
}