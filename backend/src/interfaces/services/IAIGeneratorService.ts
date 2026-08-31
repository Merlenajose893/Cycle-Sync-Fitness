import type { AiPlanDTO } from "../../dtos/aiPlan.dto.ts";
import type { AIPlanInputs } from "../../models/AIPlan.ts";

export interface IAIGeneratorService{
    generatePlan(input:AIPlanInputs):Promise<AiPlanDTO>
}