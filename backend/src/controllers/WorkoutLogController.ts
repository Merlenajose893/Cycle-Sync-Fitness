import { injectable, inject } from "tsyringe";
import type { IWorkoutLogService } from "../interfaces/services/IWorkoutLogService.js";
import { TOKENS } from "../container/tokens.js";
import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class WorkoutLogController {
    constructor(
        @inject(TOKENS.IWorkoutLogService)
        private readonly workoutLogService: IWorkoutLogService
    ) {}

    logWorkout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const result = await this.workoutLogService.logWorkout(userId, req.body);
            successResponse(res, "Workout logged successfully", result, HttpStatus.CREATED);
        } catch (error) {
            next(error);
        }
    };

    getDailyLog = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const date = (req.query.date as string) || (req.params.date as string);
            const result = await this.workoutLogService.getDailyLog(userId, date);
            successResponse(res, "Daily workout log fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getWorkoutHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const result = await this.workoutLogService.getWorkoutHistory(userId, page, limit);
            successResponse(res, "Workout history fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getExerciseHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const exerciseName = (req.params.exerciseName as string) || (req.query.exerciseName as string);
            const result = await this.workoutLogService.getExerciseProgram(userId, exerciseName);
            successResponse(res, "Exercise history fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getClientWorkoutLogs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientId = (req.params.clientId as string) || (req.params.id as string) || "";
            const result = await this.workoutLogService.getWorkoutHistory(clientId, 1, 50);
            successResponse(res, "Client workout history fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };
}
