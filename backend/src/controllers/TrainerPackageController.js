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
import { injectable, inject } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
let TrainerPackageController = class TrainerPackageController {
    trainerpackageservice;
    constructor(trainerpackageservice) {
        this.trainerpackageservice = trainerpackageservice;
    }
    createPackage = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerpackageservice.createPackage(trainerId, req.body);
            console.log(result);
            successResponse(res, "Packages are created successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    updatePackage = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerpackageservice.updatePackage(trainerId, req.body);
            successResponse(res, "Packages are updated successfully", HttpStatus.OK, result);
        }
        catch (error) {
            next(error);
        }
    };
    deletePackage = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const packageId = req.params.id;
            const result = await this.trainerpackageservice.deletePackage(trainerId, packageId);
            successResponse(res, "Packages are deleted successfully", HttpStatus.OK, result);
        }
        catch (error) {
            next(error);
        }
    };
    getTrainerPackages = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const result = await this.trainerpackageservice.getTrainerPackages(trainerId);
            successResponse(res, "Trainer packages are fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getActivePackages = async (req, res, next) => {
        try {
            const trainerId = req.params.trainerId;
            const result = await this.trainerpackageservice.getActivePackages(trainerId);
            successResponse(res, "Active packages fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getPackageById = async (req, res, next) => {
        try {
            const packageId = req.params.id;
            const result = await this.trainerpackageservice.getPackageById(packageId);
            successResponse(res, "Package fetched successfully", HttpStatus.OK, result);
        }
        catch (error) {
            next(error);
        }
    };
};
TrainerPackageController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerPackageService)),
    __metadata("design:paramtypes", [Object])
], TrainerPackageController);
export { TrainerPackageController };
//# sourceMappingURL=TrainerPackageController.js.map