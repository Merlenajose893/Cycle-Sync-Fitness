import type { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import type { ISubscriptionPlanService } from "../interfaces/services/ISubscriptionPlanService.ts";
import { TOKENS } from "../container/tokens.ts";
import { successResponse } from "../utils/response.ts";
import { HttpStatus } from "../constants/HttpStatus.ts";
import { NotFoundError } from "../errors/index.ts";

@injectable()
export class SubscriptionPlanController {
    constructor(
        @inject(TOKENS.ISubscriptionPlanService)
        private readonly subscriptionplanservice: ISubscriptionPlanService
    ) {}

    createPlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body;
            const plan = await this.subscriptionplanservice.createPlan(data);
            successResponse(res, "Subscription plan created successfully", plan, HttpStatus.CREATED);
        } catch (error) {
            next(error);
        }
    };

    getPlanById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const plan = await this.subscriptionplanservice.getPlanById(id);
            if (!plan) {
                throw new NotFoundError("Subscription plan not found");
            }
            successResponse(res, "Subscription plan fetched successfully", plan, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getPlanByCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const code = req.params.code as string;
            const plan = await this.subscriptionplanservice.getPlanByCode(code);
            if (!plan) {
                throw new NotFoundError("Subscription plan not found");
            }
            successResponse(res, "Subscription plan fetched successfully", plan, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getActivePlans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const plans = await this.subscriptionplanservice.getActivePlans();
            successResponse(res, "Active subscription plans fetched successfully", plans, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getAllPlans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const plans = await this.subscriptionplanservice.getAllPlans();
            successResponse(res, "All subscription plans fetched successfully", plans, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    updatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const plan = await this.subscriptionplanservice.updatePlan(id, req.body);
            if (!plan) {
                throw new NotFoundError("Subscription plan not found");
            }
            successResponse(res, "Subscription plan updated successfully", plan, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    deactivatePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const plan = await this.subscriptionplanservice.deactivatePlan(id);
            if (!plan) {
                throw new NotFoundError("Subscription plan not found");
            }
            successResponse(res, "Subscription plan deactivated successfully", plan, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };
}
