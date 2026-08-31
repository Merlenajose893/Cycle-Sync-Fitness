import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { ICycleLogService } from "../interfaces/services/ICycleLogService.ts";
import type { ICyclePredictionService } from "../interfaces/services/ICyclePredictionService.ts";
import type { IDailyHealthLogService } from "../interfaces/services/IDailyHealthLogService.ts";
import type { IHealthMilestoneService } from "../interfaces/services/IHealthMilestoneService.ts";
import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.ts";
import { HttpStatus } from "../constants/HttpStatus.ts";

@injectable()
export class HealthTrackingController {
  constructor(
    @inject(TOKENS.ICycleLogService) private cycleLogService: ICycleLogService,
    @inject(TOKENS.ICyclePredictionService) private cyclePredictionService: ICyclePredictionService,
    @inject(TOKENS.IDailyHealthLogService) private dailyHealthLogService: IDailyHealthLogService,
    @inject(TOKENS.IHealthMilestoneService) private healthMilestoneService: IHealthMilestoneService
  ) {}

  // ── Cycle Log Endpoints ──

  startPeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      console.log(userId);
      
      const result = await this.cycleLogService.startPeriodDate(userId, req.body);
      console.log(result);
      
      // Auto check milestones when cycle is logged
      await this.healthMilestoneService.checkAndAwardMilestones(userId);
      successResponse(res, "Period started successfully", result, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  };

  endPeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const logId = (req.params.logId || req.params.id || "") as string;
      const result = await this.cycleLogService.endPeriod(userId, logId, req.body);
      successResponse(res, "Period ended successfully", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  getCycleLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.cycleLogService.getCycleLogs(userId);
      successResponse(res, "Cycle logs fetched successfully", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  getCyclePredictions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.cyclePredictionService.predictCycle(userId);
      successResponse(res, "Cycle predictions fetched successfully", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  deleteCycleLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const logId = (req.params.logId || req.params.id || "") as string;
      await this.cycleLogService.deleteCycleLog(userId, logId);
      successResponse(res, "Cycle log deleted successfully", null, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  // ── Daily Health Log Endpoints ──

  logDailyHealth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.dailyHealthLogService.logHealth(userId, req.body);
      await this.healthMilestoneService.checkAndAwardMilestones(userId);
      successResponse(res, "Daily health log saved", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  getTodayHealthLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.dailyHealthLogService.getTodayLog(userId);
      successResponse(res, "Today's health log fetched", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  getHealthHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await this.dailyHealthLogService.getHistory(userId, page, limit);
      successResponse(res, "Health log history fetched", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  addWaterIntake = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.dailyHealthLogService.addWaterIntake(userId, req.body);
      await this.healthMilestoneService.checkAndAwardMilestones(userId);
      successResponse(res, "Water intake logged", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  // ── Milestones Endpoints ──

  getMilestones = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      const result = await this.healthMilestoneService.getUserMilestones(userId);
      successResponse(res, "Health milestones fetched", result, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
}
