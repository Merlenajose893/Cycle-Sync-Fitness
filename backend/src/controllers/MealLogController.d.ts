import type { IMealLogService } from "../interfaces/services/IMealLogService.js";
import type { Request, Response, NextFunction } from "express";
export declare class MealLogController {
    private readonly mealLogService;
    constructor(mealLogService: IMealLogService);
    logMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getDayLog: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getWeekLogs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    removeMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    setDailyTarget: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=MealLogController.d.ts.map