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
let HealthTrackingController = class HealthTrackingController {
    cycleLogService;
    cyclePredictionService;
    dailyHealthLogService;
    healthMilestoneService;
    constructor(cycleLogService, cyclePredictionService, dailyHealthLogService, healthMilestoneService) {
        this.cycleLogService = cycleLogService;
        this.cyclePredictionService = cyclePredictionService;
        this.dailyHealthLogService = dailyHealthLogService;
        this.healthMilestoneService = healthMilestoneService;
    }
    // ── Cycle Log Endpoints ──
    startPeriod = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.cycleLogService.startPeriod(userId, req.body);
            // Auto check milestones when cycle is logged
            await this.healthMilestoneService.checkAndAwardMilestones(userId);
            successResponse(res, "Period started successfully", result, HttpStatus.CREATED);
        }
        catch (error) {
            next(error);
        }
    };
    endPeriod = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const { logId } = req.params;
            const result = await this.cycleLogService.endPeriod(userId, logId, req.body);
            successResponse(res, "Period ended successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getCycleLogs = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.cycleLogService.getCycleLogs(userId);
            successResponse(res, "Cycle logs fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getCyclePredictions = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.cyclePredictionService.predictCycle(userId);
            successResponse(res, "Cycle predictions fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    deleteCycleLog = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const { logId } = req.params;
            await this.cycleLogService.deleteCycleLog(userId, logId);
            successResponse(res, "Cycle log deleted successfully", null, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    // ── Daily Health Log Endpoints ──
    logDailyHealth = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.dailyHealthLogService.logHealth(userId, req.body);
            await this.healthMilestoneService.checkAndAwardMilestones(userId);
            successResponse(res, "Daily health log saved", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getTodayHealthLog = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.dailyHealthLogService.getTodayLog(userId);
            successResponse(res, "Today's health log fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getHealthHistory = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const result = await this.dailyHealthLogService.getHistory(userId, page, limit);
            successResponse(res, "Health log history fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    addWaterIntake = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.dailyHealthLogService.addWaterIntake(userId, req.body);
            await this.healthMilestoneService.checkAndAwardMilestones(userId);
            successResponse(res, "Water intake logged", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    // ── Milestones Endpoints ──
    getMilestones = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await this.healthMilestoneService.getUserMilestones(userId);
            successResponse(res, "Health milestones fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
HealthTrackingController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ICycleLogService)),
    __param(1, inject(TOKENS.ICyclePredictionService)),
    __param(2, inject(TOKENS.IDailyHealthLogService)),
    __param(3, inject(TOKENS.IHealthMilestoneService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], HealthTrackingController);
export { HealthTrackingController };
//# sourceMappingURL=HealthTrackingController.js.map