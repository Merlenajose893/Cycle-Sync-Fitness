import type { PlanStatus } from "../../constants/aiPlan.js";
import type { AIPlanInputs, IAIPlan } from "../../models/AIPlan.js";
export interface IAIPlanService {
    generatePlans(userId: string, inputs: AIPlanInputs): Promise<IAIPlan | null>;
    createDraftPlan(userId: string, inputs: AIPlanInputs): Promise<IAIPlan | null>;
    getActivePlan(userId: string): Promise<IAIPlan | null>;
    getPlanHistory(userId: string): Promise<IAIPlan[]>;
    updatePlanStatus(planId: string, userId: string, status: PlanStatus): Promise<IAIPlan>;
    editPlan(planId: string, userId: string, updates: Partial<IAIPlan>): Promise<IAIPlan | null>;
    deletePlan(planId: string, userId: string): Promise<void>;
}
//# sourceMappingURL=IAIPlanService.d.ts.map