import type { IAIPlanService } from "../interfaces/services/IAIPlanService.js";
import type { AIPlanInputs, IAIPlan } from "../models/AIPlan.js";
import type { IAIPlanRepository } from "../interfaces/repositories/IAIPlanRepository.js";
import { PlanStatus } from "../constants/aiPlan.js";
import type { IAIGeneratorService } from "../interfaces/services/IAIGeneratorService.js";
export declare class AIPlanService implements IAIPlanService {
    private aiplanrepository;
    private aigeneratorService;
    private readonly VALID_TRANSITIONS;
    constructor(aiplanrepository: IAIPlanRepository, aigeneratorService: IAIGeneratorService);
    generatePlans: (userId: string, inputs: AIPlanInputs) => Promise<IAIPlan | null>;
    createDraftPlan: (userId: string, inputs: AIPlanInputs) => Promise<IAIPlan | null>;
    getActivePlan: (userId: string) => Promise<IAIPlan | null>;
    getPlanHistory: (userId: string) => Promise<IAIPlan[]>;
    updatePlanStatus: (planId: string, userId: string, newStatus: PlanStatus) => Promise<IAIPlan>;
    editPlan: (planId: string, userId: string, updates: Partial<IAIPlan>) => Promise<IAIPlan | null>;
    deletePlan: (planId: string, userId: string) => Promise<void>;
}
//# sourceMappingURL=AIPlanService.d.ts.map