import type { IWorkoutLogService } from "../interfaces/services/IWorkoutLogService.js";
import type { NextFunction, Request, Response } from "express";
export declare class WorkoutLogController {
    private readonly workoutLogService;
    constructor(workoutLogService: IWorkoutLogService);
    logWorkout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getDailyLog: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getWorkoutHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getExerciseHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getClientWorkoutLogs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=WorkoutLogController.d.ts.map