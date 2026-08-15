import type { IWorkoutProgramService } from "../interfaces/services/IWorkoutProgramService.js";
import type { NextFunction, Request, Response } from "express";
export declare class WorkoutProgramController {
    private workoutprogramservice;
    constructor(workoutprogramservice: IWorkoutProgramService);
    createProgram: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProgram: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteProgram: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    assignProgramToUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTrainerPrograms: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserActiveProgram: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=WorkoutProgramController.d.ts.map