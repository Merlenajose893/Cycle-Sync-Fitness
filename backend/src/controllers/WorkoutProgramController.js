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
let WorkoutProgramController = class WorkoutProgramController {
    workoutprogramservice;
    constructor(workoutprogramservice) {
        this.workoutprogramservice = workoutprogramservice;
    }
    createProgram = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const result = await this.workoutprogramservice.createProgram(trainerId, req.body);
            successResponse(res, "Program created successfully", result, HttpStatus.CREATED);
        }
        catch (error) {
            next(error);
        }
    };
    updateProgram = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const programId = req.params.id;
            const result = await this.workoutprogramservice.updateProgram(trainerId, programId, req.body);
            successResponse(res, "Program updated successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    deleteProgram = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const programId = req.params.id;
            await this.workoutprogramservice.deleteProgram(trainerId, programId);
            successResponse(res, "Program deleted successfully", null, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    assignProgramToUser = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const programId = req.params.id;
            const { userId } = req.body;
            const result = await this.workoutprogramservice.assignProgramtoUser(trainerId, programId, userId);
            successResponse(res, "Program assigned to user successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getTrainerPrograms = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const result = await this.workoutprogramservice.getTrainerPrograms(trainerId);
            successResponse(res, "Trainer programs fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getUserActiveProgram = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.workoutprogramservice.getUserActivePrograms(userId);
            successResponse(res, "Active program fetched successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
WorkoutProgramController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IWorkoutProgramService)),
    __metadata("design:paramtypes", [Object])
], WorkoutProgramController);
export { WorkoutProgramController };
//# sourceMappingURL=WorkoutProgramController.js.map