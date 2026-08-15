import type { IBaseRepository } from "./IBaseRepository.js";
import type { IAIPlan } from "../../models/AIPlan.js";
import { PlanStatus } from "../../constants/aiPlan.js";
export interface IAIPlanRepository extends IBaseRepository<IAIPlan> {
    findActivePlan(userId: string, status?: PlanStatus): Promise<IAIPlan | null>;
    findAllByUserId(userId: string): Promise<IAIPlan[]>;
    updateStatus(planId: string, status: PlanStatus): Promise<IAIPlan | null>;
    archiveActivePlans(userId: string): Promise<void>;
}
//# sourceMappingURL=IAIPlanRepository.d.ts.map