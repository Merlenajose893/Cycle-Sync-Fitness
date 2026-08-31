import { injectable } from "tsyringe";
import type { ISubscriptionPlanRepository } from "../interfaces/repositories/ISubscriptionplanRepository.ts";
import { SubscriptionPlan } from "../models/SubscriptionPlan.ts";
import type { ISubscriptionPlan } from "../models/SubscriptionPlan.ts";
import { BaseRepository } from "./BaseRepository.ts";

import type { UpdateSubscriptionPlanDTO } from "../dtos/subscriptionPlandto.ts";

@injectable()
export class SubscriptionPlanRepository extends BaseRepository<ISubscriptionPlan> implements ISubscriptionPlanRepository {
    constructor() {
        super(SubscriptionPlan);
    }

    async findByCode(code: string): Promise<ISubscriptionPlan | null> {
        return this.model.findOne({ code: code.toUpperCase() });
    }

    async findAllActive(): Promise<ISubscriptionPlan[]> {
        return this.model.find({ isActive: true });
    }

    async update(id: string, data: UpdateSubscriptionPlanDTO | Partial<ISubscriptionPlan>): Promise<ISubscriptionPlan | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }
}