import type { UpdateSubscriptionPlanDTO } from "../../dtos/subscriptionPlandto.js";
import type { ISubscriptionPlan } from "../../models/SubscriptionPlan.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface ISubscriptionPlanRepository extends IBaseRepository<ISubscriptionPlan>{
    findByCode(code:string):Promise<ISubscriptionPlan | null>;
    findAllActive():Promise<ISubscriptionPlan[]>;
    update(id:string, data:UpdateSubscriptionPlanDTO | Partial<ISubscriptionPlan>):Promise<ISubscriptionPlan | null>;
}


export type ISubscriptionplanRepository = ISubscriptionPlanRepository;