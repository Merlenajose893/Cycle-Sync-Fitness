import type { UpdateSubscriptionPlanDTO } from "../../dtos/subscriptionPlandto.ts";
import type { ISubscriptionPlan } from "../../models/SubscriptionPlan.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface ISubscriptionPlanRepository extends IBaseRepository<ISubscriptionPlan>{
    findByCode(code:string):Promise<ISubscriptionPlan | null>;
    findAllActive():Promise<ISubscriptionPlan[]>;
    update(id:string, data:UpdateSubscriptionPlanDTO | Partial<ISubscriptionPlan>):Promise<ISubscriptionPlan | null>;
}


export type ISubscriptionplanRepository = ISubscriptionPlanRepository;