import { inject, injectable } from "tsyringe";
import type { IAIPlanService } from "../interfaces/services/IAIPlanService.js";
import type { AIPlanInputs, IAIPlan } from "../models/AIPlan.js";
import { TOKENS } from "../container/tokens.js";
import type { IAIPlanRepository } from "../interfaces/repositories/IAIPlanRepository.js";
import { NotFoundError } from "../errors/index.js";
import { PlanStatus } from "../constants/aiPlan.js";
import type { IAIGeneratorService } from "../interfaces/services/IAIGeneratorService.js";
@injectable()
export class AIPlanService implements IAIPlanService{
    constructor(@inject(TOKENS.IAIPlanRepository) private aiplanrepository:IAIPlanRepository,@inject(TOKENS.IAIProvider) private aigeneratorService:IAIGeneratorService)
    {

    }
generatePlans=async(userId: string, inputs: AIPlanInputs): Promise<IAIPlan | null> {
    const user=await this.aiplanrepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not found");
    }

    const activePlan=await this.aiplanrepository.findActivePlan(userId,PlanStatus.ACTIVE);
    if(activePlan)
    {
        await this.aiplanrepository.archiveActivePlans(userId);
    }
    const generatedPlan=await this.aigeneratorService.generatePlan(inputs);
    const newPlans=await this.aiplanrepository.create({
        userId,
        status:PlanStatus.ACTIVE,
        inputs,
        summary:generatedPlan.plan,
        workoutPlan:generatedPlan.workout,
        mealPlan:generatedPlan.meal,
        recommendations:generatedPlan.recommendation

    })

    return await this.aiplanrepository.save(newPlans);


    
}
}