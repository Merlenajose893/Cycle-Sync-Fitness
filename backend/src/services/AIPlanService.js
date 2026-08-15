var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors/index.js";
import { PlanStatus } from "../constants/aiPlan.js";
let AIPlanService = class AIPlanService {
    aiplanrepository;
    aigeneratorService;
    VALID_TRANSITIONS = {
        [PlanStatus.DRAFT]: [PlanStatus.ACTIVE, PlanStatus.ARCHIVED],
        [PlanStatus.ACTIVE]: [PlanStatus.ARCHIVED],
        [PlanStatus.ARCHIVED]: [], // Terminal state
    };
    constructor(aiplanrepository, aigeneratorService) {
        this.aiplanrepository = aiplanrepository;
        this.aigeneratorService = aigeneratorService;
    }
    generatePlans = async (userId, inputs) => {
        // Archive existing active plans
        await this.aiplanrepository.archiveActivePlans(userId);
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
        return await this.aiplanrepository.save(newPlan);
    };
    createDraftPlan = async (userId, inputs) => {
        const generatedPlan = await this.aigeneratorService.generatePlan(inputs);
        const draftPlan = await this.aiplanrepository.create({
            userId,
            status: PlanStatus.DRAFT,
            inputs,
            summary: generatedPlan.summary,
            workoutPlan: generatedPlan.workoutPlan,
            mealPlan: generatedPlan.mealPlan,
            recommendations: generatedPlan.recommendations,
        });
        return await this.aiplanrepository.save(draftPlan);
    };
    getActivePlan = async (userId) => {
        const activePlan = await this.aiplanrepository.findActivePlan(userId, PlanStatus.ACTIVE);
        if (!activePlan) {
            throw new NotFoundError("No active plan found");
        }
        return activePlan;
    };
    getPlanHistory = async (userId) => {
        const plans = await this.aiplanrepository.findAllByUserId(userId);
        return plans || [];
    };
    updatePlanStatus = async (planId, userId, newStatus) => {
        const plan = await this.aiplanrepository.findById(planId);
        if (!plan) {
            throw new NotFoundError("Plan not found");
        }
        // Ownership check
        if (plan.userId.toString() !== userId) {
            throw new ForbiddenError("Not authorized to modify this plan");
        }
        // State transition check
        const allowedTransitions = this.VALID_TRANSITIONS[plan.status] || [];
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
    editPlan = async (planId, userId, updates) => {
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
        const updatedPlan = await this.aiplanrepository.update(planId, updates);
        return updatedPlan;
    };
    deletePlan = async (planId, userId) => {
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
};
AIPlanService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IAIPlanRepository)),
    __param(1, inject(TOKENS.IAIGeneratorService)),
    __metadata("design:paramtypes", [Object, Object])
], AIPlanService);
export { AIPlanService };
//# sourceMappingURL=AIPlanService.js.map