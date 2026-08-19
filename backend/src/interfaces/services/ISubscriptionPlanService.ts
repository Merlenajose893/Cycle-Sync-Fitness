import type { CreateSubscriptionPlanDTO, UpdateSubscriptionPlanDTO } from "../../dtos/subscriptionPlandto.js";
import type { ISubscriptionPlan } from "../../models/SubscriptionPlan.js";

export interface ISubscriptionPlanService{
    createPlan(data:CreateSubscriptionPlanDTO):Promise<ISubscriptionPlan>;
    getPlanById(id:string):Promise<ISubscriptionPlan>;
    getPlanByCode(code:string):Promise<ISubscriptionPlan>;
    getActivePlans():Promise<ISubscriptionPlan[]>;
    getAllPlans():Promise<ISubscriptionPlan[]>;
    updatePlan(id:string,data:UpdateSubscriptionPlanDTO):Promise<ISubscriptionPlan|null>;
    deactivatePlan(id:string):Promise<ISubscriptionPlan|null>;
}