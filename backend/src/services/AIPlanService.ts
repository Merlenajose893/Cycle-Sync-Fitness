import { inject, injectable } from "tsyringe";
import type { IAIPlanService } from "../interfaces/services/IAIPlanService.js";
import type { AIPlanInputs, IAIPlan } from "../models/AIPlan.js";
import { TOKENS } from "../container/tokens.js";
import type { IAIPlanRepository } from "../interfaces/repositories/IAIPlanRepository.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors/index.js";
import { PlanStatus } from "../constants/aiPlan.js";
import type { IAIGeneratorService } from "../interfaces/services/IAIGeneratorService.js";
import { Types } from "mongoose";

@injectable()
export class AIPlanService implements IAIPlanService {
    private readonly VALID_TRANSITIONS: Record<PlanStatus, PlanStatus[]> = {
        [PlanStatus.DRAFT]: [PlanStatus.ACTIVE, PlanStatus.ARCHIVED],
        [PlanStatus.ACTIVE]: [PlanStatus.ARCHIVED],
        [PlanStatus.ARCHIVED]: [], // Terminal state
    };

    constructor(
        @inject(TOKENS.IAIPlanRepository) private aiplanrepository: IAIPlanRepository,
        @inject(TOKENS.IAIGeneratorService) private aigeneratorService: IAIGeneratorService
    ) {}

    generatePlans = async (userId: string, inputs: AIPlanInputs): Promise<IAIPlan | null> => {
        // Archive existing active plans
        await this.aiplanrepository.archiveActivePlans(userId);

        const generatedPlan = await this.aigeneratorService.generatePlan(inputs);
        const newPlan = await this.aiplanrepository.create({
            userId:new Types.ObjectId(userId),
            status: PlanStatus.ACTIVE,
            inputs,
            summary: generatedPlan.summary,
            workoutPlan: generatedPlan.workoutPlan as any,
            mealPlan: generatedPlan.mealPlan as any,
            recommendations: generatedPlan.recommendations,
        });

        return await this.aiplanrepository.save(newPlan);
    };

    createDraftPlan = async (userId: string, inputs: AIPlanInputs): Promise<IAIPlan | null> => {
        const generatedPlan = await this.aigeneratorService.generatePlan(inputs);
        const draftPlan = await this.aiplanrepository.create({
            userId:new Types.ObjectId(userId),
            status: PlanStatus.DRAFT,
            inputs,
            summary: generatedPlan.summary,
            workoutPlan: generatedPlan.workoutPlan as any,
            mealPlan: generatedPlan.mealPlan as any,
            recommendations: generatedPlan.recommendations,
        });

        return await this.aiplanrepository.save(draftPlan);
    };

    getActivePlan = async (userId: string): Promise<IAIPlan | null> => {
        const activePlan = await this.aiplanrepository.findActivePlan(userId, PlanStatus.ACTIVE);
        if (!activePlan) {
            throw new NotFoundError("No active plan found");
        }
        return activePlan;
    };

    getPlanHistory = async (userId: string): Promise<IAIPlan[]> => {
        const plans = await this.aiplanrepository.findAllByUserId(userId);
        return plans || [];
    };

    updatePlanStatus = async (planId: string, userId: string, newStatus: PlanStatus): Promise<IAIPlan> => {
        const plan = await this.aiplanrepository.findById(planId);
        if (!plan) {
            throw new NotFoundError("Plan not found");
        }

        // Ownership check
        if (plan.userId.toString() !== userId) {
            throw new ForbiddenError("Not authorized to modify this plan");
        }

        // State transition check
        const allowedTransitions = this.VALID_TRANSITIONS[plan.status as PlanStatus] || [];
        if (!allowedTransitions.includes(newStatus)) {
            throw new BadRequestError(`Invalid plan status transition from ${plan.status} to ${newStatus}`);
        }

        // If activating, auto-archive existing active plan
        if (newStatus === PlanStatus.ACTIVE) {
            await this.aiplanrepository.archiveActivePlans(userId);
        }

        const updated = await this.aiplanrepository.updateStatus(planId, newStatus);
        if (!updated) {
            throw new BadRequestError("Failed to update plan status");
        }
        return updated;
    };

    editPlan = async (planId: string, userId: string, updates: Partial<IAIPlan>): Promise<IAIPlan | null> => {
        const plan = await this.aiplanrepository.findById(planId);
        if (!plan) {
            throw new NotFoundError("Plan not found");
        }

        // Ownership check
        if (plan.userId.toString() !== userId) {
            throw new ForbiddenError("Not authorized to edit this plan");
        }

        if (plan.status === PlanStatus.ARCHIVED) {
            throw new BadRequestError("Cannot edit an archived plan");
        }

        Object.assign(plan, updates);
        const updatedPlan = await this.aiplanrepository.save(plan);
        return updatedPlan;
    };

    deletePlan = async (planId: string, userId: string): Promise<void> => {
        const plan = await this.aiplanrepository.findById(planId);
        if (!plan) {
            throw new NotFoundError("Plan not found");
        }

        // Ownership check
        if (plan.userId.toString() !== userId) {
            throw new ForbiddenError("Not authorized to delete this plan");
        }

        await this.aiplanrepository.deleteById(planId);
    };
}