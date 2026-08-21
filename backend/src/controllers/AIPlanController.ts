import type { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IAIPlanService } from "../interfaces/services/IAIPlanService.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class AIPlanController {
    constructor(@inject(TOKENS.IAIPlanService) private aiplanservice: IAIPlanService) {}

    generatePlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const result = await this.aiplanservice.generatePlans(userId, req.body);
            successResponse(res, "Plan generated successfully", result, HttpStatus.CREATED);
        } catch (error) {
            next(error);
        }
    };

    createDraftPlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const result = await this.aiplanservice.createDraftPlan(userId, req.body);
            successResponse(res, "Draft plan created successfully", result, HttpStatus.CREATED);
        } catch (error) {
            next(error);
        }
    };

    getActivePlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const result = await this.aiplanservice.getActivePlan(userId);
            successResponse(res, "Active plan fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getPlanHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const result = await this.aiplanservice.getPlanHistory(userId);
            successResponse(res, "Plan history fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    updatePlanStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const planId = req.params.id as string;
            const { status } = req.body;
            const result = await this.aiplanservice.updatePlanStatus(planId, userId, status);
            successResponse(res, "Plan status updated successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    editPlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const planId = req.params.id as string;
            const result = await this.aiplanservice.editPlan(planId, userId, req.body);
            successResponse(res, "Plan updated successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    deletePlan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const planId = req.params.id as string;
            await this.aiplanservice.deletePlan(planId, userId);
            successResponse(res, "Plan deleted successfully", null, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };
}