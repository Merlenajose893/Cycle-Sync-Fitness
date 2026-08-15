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
import { injectable, inject } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
let WorkoutLogController = class WorkoutLogController {
    workoutLogService;
    constructor(workoutLogService) {
        this.workoutLogService = workoutLogService;
    }
    logWorkout = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const file = req.file;
            const result = await this.workoutLogService.logWorkout(userId, req.body, file);
            successResponse(res, "Workout logged successfully", result, HttpStatus.CREATED);
        }
        catch (error) {
            next(error);
        }
    };
    getDailyLog = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const date = req.query.date || req.params.date;
            const result = await this.workoutLogService.getDailyLog(userId, date);
            successResponse(res, "Daily workout log fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getWorkoutHistory = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const result = await this.workoutLogService.getWorkoutHistory(userId, page, limit);
            successResponse(res, "Workout history fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getExerciseHistory = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const exerciseName = req.params.exerciseName || req.query.exerciseName;
            const result = await this.workoutLogService.getExerciseProgram(userId, exerciseName);
            successResponse(res, "Exercise history fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getClientWorkoutLogs = async (req, res, next) => {
        try {
            const clientId = req.params.clientId;
            const result = await this.workoutLogService.getWorkoutHistory(clientId, 1, 50);
            successResponse(res, "Client workout history fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
WorkoutLogController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IWorkoutLogService)),
    __metadata("design:paramtypes", [Object])
], WorkoutLogController);
export { WorkoutLogController };
//# sourceMappingURL=WorkoutLogController.js.map