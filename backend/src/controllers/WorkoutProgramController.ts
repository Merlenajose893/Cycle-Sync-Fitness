import { injectable, inject } from "tsyringe";
import type { IWorkoutProgramService } from "../interfaces/services/IWorkoutProgramService.js";
import { TOKENS } from "../container/tokens.js";
import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class WorkoutProgramController {
    constructor(
        @inject(TOKENS.IWorkoutProgramService)
        private workoutprogramservice: IWorkoutProgramService
    ) {}

    createProgram = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const trainerId = req.user?.userId!;
            const result = await this.workoutprogramservice.createProgram(trainerId, req.body);
            successResponse(res, "Program created successfully", result, HttpStatus.CREATED);
        } catch (error) {
            next(error);
        }
    };

    updateProgram = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const trainerId = req.user?.userId!;
            const programId = req.params.id;
            const result = await this.workoutprogramservice.updateProgram(trainerId, programId, req.body);
            successResponse(res, "Program updated successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    deleteProgram = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const trainerId = req.user?.userId!;
            const programId = req.params.id;
            await this.workoutprogramservice.deleteProgram(trainerId, programId);
            successResponse(res, "Program deleted successfully", null, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    assignProgramToUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const trainerId = req.user?.userId!;
            const programId = req.params.id;
            const { userId } = req.body;
            const result = await this.workoutprogramservice.assignProgramtoUser(trainerId, programId, userId);
            successResponse(res, "Program assigned to user successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getTrainerPrograms = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const trainerId = req.user?.userId!;
            const result = await this.workoutprogramservice.getTrainerPrograms(trainerId);
            successResponse(res, "Trainer programs fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };

    getUserActiveProgram = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId!;
            const result = await this.workoutprogramservice.getUserActivePrograms(userId);
            successResponse(res, "Active program fetched successfully", result, HttpStatus.OK);
        } catch (error) {
            next(error);
        }
    };
}