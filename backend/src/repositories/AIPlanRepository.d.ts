import { PlanStatus } from "../constants/aiPlan.js";
import type { IAIPlanRepository } from "../interfaces/repositories/IAIPlanRepository.js";
import { type IAIPlan } from "../models/AIPlan.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class AIPlanRepository extends BaseRepository<IAIPlan> implements IAIPlanRepository {
    constructor();
    findActivePlan(userId: string): Promise<IAIPlan | null>;
    findAllByUserId(userId: string): Promise<IAIPlan[]>;
    updateStatus(planId: string, status: PlanStatus): Promise<IAIPlan | null>;
    archiveActivePlans(userId: string): Promise<void>;
}
//# sourceMappingURL=AIPlanRepository.d.ts.map