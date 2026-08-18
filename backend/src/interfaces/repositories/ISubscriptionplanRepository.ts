import type { ISubscriptionPlan } from "../../models/SubscriptionPlan.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface ISubscriptionplanRepository extends IBaseRepository<ISubscriptionPlan>{
    findByCode(code:string):Promise<ISubscriptionPlan>
    findAllActive():Promise<ISubscriptionPlan[]>;
}