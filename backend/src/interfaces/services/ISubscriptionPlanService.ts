import type { CreateSubscriptionPlanDTO, UpdateSubscriptionPlanDTO } from "../../dtos/subscriptionPlandto.ts";
import type { ISubscriptionPlan } from "../../models/SubscriptionPlan.ts";

export interface ISubscriptionPlanService{
    createPlan(data:CreateSubscriptionPlanDTO):Promise<ISubscriptionPlan>;
    getPlanById(id:string):Promise<ISubscriptionPlan | null>;
    getPlanByCode(code:string):Promise<ISubscriptionPlan | null>;
    getActivePlans():Promise<ISubscriptionPlan[]>;
    getAllPlans():Promise<ISubscriptionPlan[]>;
    updatePlan(id:string,data:UpdateSubscriptionPlanDTO):Promise<ISubscriptionPlan|null>;
    deactivatePlan(id:string):Promise<ISubscriptionPlan|null>;
}