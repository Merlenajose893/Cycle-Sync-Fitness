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
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
let AIPlanController = class AIPlanController {
    aiplanservice;
    constructor(aiplanservice) {
        this.aiplanservice = aiplanservice;
    }
    generatePlan = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.aiplanservice.generatePlans(userId, req.body);
            successResponse(res, "Plan generated successfully", result, HttpStatus.CREATED);
        }
        catch (error) {
            next(error);
        }
    };
    createDraftPlan = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.aiplanservice.createDraftPlan(userId, req.body);
            successResponse(res, "Draft plan created successfully", result, HttpStatus.CREATED);
        }
        catch (error) {
            next(error);
        }
    };
    getActivePlan = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.aiplanservice.getActivePlan(userId);
            successResponse(res, "Active plan fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getPlanHistory = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.aiplanservice.getPlanHistory(userId);
            successResponse(res, "Plan history fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    updatePlanStatus = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const planId = req.params.id;
            const { status } = req.body;
            const result = await this.aiplanservice.updatePlanStatus(planId, userId, status);
            successResponse(res, "Plan status updated successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    editPlan = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const planId = req.params.id;
            const result = await this.aiplanservice.editPlan(planId, userId, req.body);
            successResponse(res, "Plan updated successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    deletePlan = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const planId = req.params.id;
            await this.aiplanservice.deletePlan(planId, userId);
            successResponse(res, "Plan deleted successfully", null, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
AIPlanController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IAIPlanService)),
    __metadata("design:paramtypes", [Object])
], AIPlanController);
export { AIPlanController };
//# sourceMappingURL=AIPlanController.js.map