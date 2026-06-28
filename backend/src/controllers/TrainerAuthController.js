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
import { UnauthorizedError } from "../errors/index.js";
let TrainerAuthController = class TrainerAuthController {
    trainerAuthService;
    constructor(trainerAuthService) {
        this.trainerAuthService = trainerAuthService;
    }
    registerTrainer = async (req, res, next) => {
        const result = await this.trainerAuthService.registerTrainer(req.body);
        successResponse(res, "Trainer Registered Successfully", result, HttpStatus.CREATED);
    };
    verifyTrainerOTP = async (req, res) => {
        await this.trainerAuthService.verifyTrainerOtp(req.body, res);
        successResponse(res, "Trainer email verified", null, HttpStatus.OK);
    };
    resendTrainerOTP = async (req, res) => {
        const { trainerId } = req.body;
        await this.trainerAuthService.resendOTP(trainerId);
        successResponse(res, "OTP resent successfully", null, HttpStatus.OK);
    };
    loginTrainer = async (req, res) => {
        await this.trainerAuthService.loginTrainer(req.body, res);
        successResponse(res, "Trainer login successful", null, HttpStatus.OK);
    };
    logoutTrainer = async (req, res) => {
        const trainerId = req.user?.userId;
        if (!trainerId) {
            throw new UnauthorizedError("Trainer ID is missing");
        }
        await this.trainerAuthService.logoutTrainer(trainerId, res);
        successResponse(res, "Trainer logout successfull", null, HttpStatus.OK);
    };
};
TrainerAuthController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerAuthService)),
    __metadata("design:paramtypes", [Object])
], TrainerAuthController);
export { TrainerAuthController };
//# sourceMappingURL=TrainerAuthController.js.map