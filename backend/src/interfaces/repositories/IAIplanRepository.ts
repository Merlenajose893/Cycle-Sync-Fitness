import type { IBaseRepository } from "./IBaseRepository.js";
import type { IAIPlan } from "../../models/AIPlan.js";
import { PlanStatus } from "../../constants/aiPlan.js";
export interface IAIplanRepository extends IBaseRepository<IAIPlan> {
    findActivePlan(userId: string): Promise<IAIPlan | null>;
    findAllByUserId(userId: string): Promise<IAIPlan[]>
    updateStatus(planId: string, status: PlanStatus): Promise<IAIPlan | null>;

    archiveActivePlans(userId: string): Promise<void>;

    delete(userId: string): Promise<void>;

}