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
import { container, inject, injectable } from "tsyringe";
import { successResponse } from "../utils/response.js";
import { TOKENS } from "../container/tokens.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import { errorResponse } from "../dtos/response.dto.js";
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    adminLogin = async (req, res, next) => {
        try {
            const result = await this.adminService.adminLogin(req.body, res);
            successResponse(res, "Admin Login Successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    listUsers = async (req, res, next) => {
        try {
            const result = await this.adminService.listUsers({ page: Number(req.query.page) || 1, limit: Number(req.query.limit || 10) });
            successResponse(res, "Users are retrieved successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    listTrainers = async (req, res, next) => {
        try {
            const result = await this.adminService.listTrainer({
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10
            });
            successResponse(res, "Trainers are retrieved successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    blockUser = async (req, res, next) => {
        try {
            const userId = req.params.id;
            const result = await this.adminService.blockUser(userId);
            successResponse(res, "User is blocked Successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    unblockUser = async (req, res, next) => {
        try {
            const userId = req.params.id;
            const result = await this.adminService.unblockUser(userId);
            successResponse(res, "User is unblocked successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    blockTrainer = async (req, res, next) => {
        try {
            const trainerId = req.params.id;
            const result = await this.adminService.blockTrainer(trainerId);
            successResponse(res, "Trainer blocked successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    unblockTrainer = async (req, res, next) => {
        try {
            const trainerId = req.params.id;
            const result = await this.adminService.unblockTrainer(trainerId);
            successResponse(res, "Trainer unblocked successfully", result, HttpStatus.OK);
        }
        catch (error) {
        }
    };
    inviteTrainerController = async (req, res, next) => {
        try {
            const data = req.body;
            const result = await this.adminService.inviteTrainer(data);
            successResponse(res, "Trainer is invited", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getPendingTrainers = async (req, res, next) => {
        try {
            const result = await this.adminService.getPendingTrainers();
            successResponse(res, "Pending Trainers are fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    approveTrainer = async (req, res, next) => {
        try {
            const { trainerId } = req.params;
            const result = await this.adminService.approveTrainer(trainerId);
            successResponse(res, "Trainer are approved", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    rejectTrainer = async (req, res, next) => {
        try {
            const { trainerId } = req.params;
            const { reason } = req.body;
            const result = await this.adminService.rejectTrainer(trainerId, reason);
            successResponse(res, "Trainer is rejected", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
AdminController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IAdminService)),
    __metadata("design:paramtypes", [Object])
], AdminController);
export { AdminController };
//# sourceMappingURL=AdminAuthController.js.map