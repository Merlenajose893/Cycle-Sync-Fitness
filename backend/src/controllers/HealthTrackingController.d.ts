import type { ICycleLogService } from "../interfaces/services/ICycleLogService.js";
import type { ICyclePredictionService } from "../interfaces/services/ICyclePredictionService.js";
import type { IDailyHealthLogService } from "../interfaces/services/IDailyHealthLogService.js";
import type { IHealthMilestoneService } from "../interfaces/services/IHealthMilestoneService.js";
import type { NextFunction, Request, Response } from "express";
export declare class HealthTrackingController {
    private cycleLogService;
    private cyclePredictionService;
    private dailyHealthLogService;
    private healthMilestoneService;
    constructor(cycleLogService: ICycleLogService, cyclePredictionService: ICyclePredictionService, dailyHealthLogService: IDailyHealthLogService, healthMilestoneService: IHealthMilestoneService);
    startPeriod: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    endPeriod: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCycleLogs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCyclePredictions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCycleLog: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logDailyHealth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTodayHealthLog: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getHealthHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addWaterIntake: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMilestones: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=HealthTrackingController.d.ts.map