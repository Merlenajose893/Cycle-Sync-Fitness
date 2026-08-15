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
let TrainerBrowserController = class TrainerBrowserController {
    trainerbrowserservice;
    constructor(trainerbrowserservice) {
        this.trainerbrowserservice = trainerbrowserservice;
    }
    browseTrainers = async (req, res, next) => {
        try {
            const result = await this.trainerbrowserservice.getApprovedTrainers();
            successResponse(res, "Trainers Fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getTrainerProfile = async (req, res, next) => {
        try {
            const trainerId = req.params.trainerId;
            const result = await this.trainerbrowserservice.getTrainerProfile(trainerId);
            successResponse(res, "Trainer profile fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
TrainerBrowserController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerBrowserService)),
    __metadata("design:paramtypes", [Object])
], TrainerBrowserController);
export { TrainerBrowserController };
//# sourceMappingURL=TrainerBrowserController.js.map