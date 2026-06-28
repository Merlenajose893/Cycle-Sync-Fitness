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
import { Request, Response, NextFunction } from "express";
import { IUserOnboardingService } from "../interfaces/services/IUserOnboardingService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse, } from "../utils/response.js";
let UserOnboardingControlling = class UserOnboardingControlling {
    useronboardingService;
    constructor(useronboardingService) {
        this.useronboardingService = useronboardingService;
    }
    async getOnboardingStatus(req, res, next) {
        try {
            const userId = req.user?.userId;
            const result = await this.useronboardingService.getOnboardingStatus(userId);
            successResponse(res, "Onboarding status fetched success", result);
        }
        catch (error) {
            next(error);
            console.log(error);
        }
    }
    async updateBodyDetails(req, res, next) {
        try {
            const userId = req.user?.userId;
            const result = await this.useronboardingService.updateBodyDetails(userId, req.body);
            successResponse(res, "Body details are updated", result);
        }
        catch (error) {
            next(error);
            console.log(error);
        }
    }
    async updateCycleDetails(req, res, next) {
        try {
            const userId = req.user?.userId;
            const result = await this.useronboardingService.updateCycleSetUp(userId, req.body);
            successResponse(res, "Cycle details are updated", result);
        }
        catch (error) {
            next(error);
            console.log(error);
        }
    }
    async updateGoals(req, res, next) {
        try {
            const userId = req.user?.userId;
            const result = await this.useronboardingService.updateGoals(userId, req.body);
            successResponse(res, "Goals are updated", result);
        }
        catch (error) {
            next(error);
            console.log(error);
        }
    }
    async completeOnboarding(req, res, next) {
        const userId = req.user?.userId;
        const result = await this.useronboardingService.completeOnboarding(userId);
        successResponse(res, "Completed Onboarding", result);
    }
};
UserOnboardingControlling = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserOnboardingService)),
    __metadata("design:paramtypes", [Object])
], UserOnboardingControlling);
export { UserOnboardingControlling };
//# sourceMappingURL=UserOnboardinController.js.map