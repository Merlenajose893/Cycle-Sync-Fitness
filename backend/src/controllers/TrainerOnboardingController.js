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
let TrainerOnboardingController = class TrainerOnboardingController {
    trainerOnboardingService;
    constructor(trainerOnboardingService) {
        this.trainerOnboardingService = trainerOnboardingService;
    }
    async getTrainerOnboardingStatus(req, res, next) {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerOnboardingService.getTrainerOnboardingStatus(trainerId);
            successResponse(res, "Trainer onboarding status fetched successfully", result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateTrainerProfile(req, res, next) {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerOnboardingService.updateTrainerProfile(trainerId, req.body);
            console.log(result);
            successResponse(res, "Trainer profile updated successfully", result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateTrainerCertifications(req, res, next) {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerOnboardingService.updateTrainerCertifications(trainerId, req.body);
            successResponse(res, "Trainer certifications updated successfully", result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateTrainerPackages(req, res, next) {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerOnboardingService.updateTrainerPackages(trainerId, req.body);
            successResponse(res, "Trainer Packages updated successfully", result);
        }
        catch (error) {
            next(error);
        }
    }
    async completeTrainerOnboarding(req, res, next) {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerOnboardingService.completeTrainerOnboardingStatus(trainerId);
            successResponse(res, "Trainer onboarding completed successfully", result);
        }
        catch (error) {
            next(error);
        }
    }
    uploadAvatar = async (req, res, next) => {
        try {
            console.log("hi");
            const trainerId = req.user?.userId;
            const file = req.file;
            console.log(trainerId);
            console.log(file);
            const trainer = await this.trainerOnboardingService.uploadAvatar(trainerId, file);
            successResponse(res, "Avatar uploaded successfully", trainer, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    uploadDocuments = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const files = req.files;
            const trainer = await this.trainerOnboardingService.uploadDocuments(trainerId, files);
            successResponse(res, "Documents uploaded successfully", trainer, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
TrainerOnboardingController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerOnboardingService)),
    __metadata("design:paramtypes", [Object])
], TrainerOnboardingController);
export { TrainerOnboardingController };
//# sourceMappingURL=TrainerOnboardingController.js.map