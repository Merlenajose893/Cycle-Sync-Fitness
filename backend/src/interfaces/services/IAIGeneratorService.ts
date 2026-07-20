import type { AiPlanDTO } from "../../dtos/aiPlan.dto.js";
import type { AIPlanInputs } from "../../models/AIPlan.js";

export interface IAIGeneratorService{
    generatePlan(input:AIPlanInputs):Promise<AiPlanDTO>
}