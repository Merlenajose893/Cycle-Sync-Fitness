import { inject, injectable } from "tsyringe";
import type { IAIPlanService } from "../interfaces/services/IAIPlanService.js";
import type { AIPlanInputs, IAIPlan } from "../models/AIPlan.js";
import { TOKENS } from "../container/tokens.js";
import type { IAIPlanRepository } from "../interfaces/repositories/IAIPlanRepository.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { PlanStatus } from "../constants/aiPlan.js";
import type { IAIGeneratorService } from "../interfaces/services/IAIGeneratorService.js";

@injectable()
export class AIPlanService implements IAIPlanService {
    constructor(
        @inject(TOKENS.IAIPlanRepository) private aiplanrepository: IAIPlanRepository,
        @inject(TOKENS.IAIGeneratorService) private aigeneratorService: IAIGeneratorService
    ) {}

    generatePlans = async (userId: string, inputs: AIPlanInputs): Promise<IAIPlan | null> => {
        const activePlan = await this.aiplanrepository.findActivePlan(userId, PlanStatus.ACTIVE);
        if (activePlan) {
            await this.aiplanrepository.archiveActivePlans(userId);
        }

        const generatedPlan = await this.aigeneratorService.generatePlan(inputs);
        const newPlan = await this.aiplanrepository.create({
    userId,
    status: PlanStatus.ACTIVE,
    inputs,
    summary: generatedPlan.summary,
    workoutPlan: generatedPlan.workoutPlan,
    mealPlan: generatedPlan.mealPlan,
    recommendations: generatedPlan.recommendations,
});
        console.log(newPlan);
        

        return await this.aiplanrepository.save(newPlan);
    };

    getActivePlan = async (userId: string): Promise<IAIPlan | null> => {
        const activePlan = await this.aiplanrepository.findActivePlan(userId, PlanStatus.ACTIVE);
        if (!activePlan) {
            throw new NotFoundError("No active plans found");
        }
        return activePlan;
    };

    getPlanHistory = async (userId: string): Promise<IAIPlan[]> => {
        const plans = await this.aiplanrepository.findAllByUserId(userId);
        if (!plans || plans.length === 0) {
            throw new NotFoundError("Plan history not found");
        }
        return plans;
    };

    updatePlanStatus = async (planId: string, status: PlanStatus): Promise<IAIPlan> => {
        const plan = await this.aiplanrepository.updateStatus(planId, status);
        if (!plan) {
            throw new BadRequestError("Not able to update plan status");
        }
        return plan;
    };

    deletePlan = async (planId: string): Promise<void> => {
        const plan = await this.aiplanrepository.findById(planId);
        if (!plan) {
            throw new NotFoundError("Plan not found");
        }
        await this.aiplanrepository.deleteById(planId);
    };
}