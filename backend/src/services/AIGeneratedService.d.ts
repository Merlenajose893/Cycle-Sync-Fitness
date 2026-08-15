import type { IAIGeneratorService } from "../interfaces/services/IAIGeneratorService.js";
import type { AiPlanDTO } from "../dtos/aiPlan.dto.js";
import type { AIPlanInputs } from "../models/AIPlan.js";
import type { IAIProvider } from "../interfaces/services/IAIProvider.js";
export declare class AIGeneratedService implements IAIGeneratorService {
    private aiprovider;
    constructor(aiprovider: IAIProvider);
    generatePlan: (input: AIPlanInputs) => Promise<AiPlanDTO>;
}
//# sourceMappingURL=AIGeneratedService.d.ts.map