import { model } from "mongoose";
import type { ISubscriptionplanRepository } from "../interfaces/repositories/ISubscriptionplanRepository.js";
import { SubscriptionPlan } from "../models/SubscriptionPlan.js";
import type { ISubscriptionPlan } from "../models/SubscriptionPlan.js";

export class SubscriptionPlanRepository extends BaseRepository<ISubscriptionPlan>  implements ISubscriptionplanRepository{
    constructor()
    {
        super(SubscriptionPlan)
    }
    async findByCode(code: string): Promise<ISubscriptionPlan> {
        return this.model.findOne({code});
    }
    findAllActive(): Promise<ISubscriptionPlan[]> {
        return this.model.find()
    }

}