import type { IBaseRepository } from "./IBaseRepository.ts";
import type { IAIPlan } from "../../models/AIPlan.ts";
import { PlanStatus } from "../../constants/aiPlan.ts";

export interface IAIPlanRepository extends IBaseRepository<IAIPlan> {
    findActivePlan(userId: string, status?: PlanStatus): Promise<IAIPlan | null>;
    findAllByUserId(userId: string): Promise<IAIPlan[]>;
    updateStatus(planId: string, status: PlanStatus): Promise<IAIPlan | null>;
    archiveActivePlans(userId: string): Promise<void>;
}