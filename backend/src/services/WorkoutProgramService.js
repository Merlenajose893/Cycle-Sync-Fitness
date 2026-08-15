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
import { NotFoundError, UnauthorizedError } from "../errors/index.js";
let WorkoutProgramService = class WorkoutProgramService {
    workoutrepository;
    constructor(workoutrepository) {
        this.workoutrepository = workoutrepository;
    }
    createProgram = async (trainerId, data) => {
        const program = await this.workoutrepository.create({
            trainerId: trainerId,
            ...data
        });
        return program;
    };
    updateProgram = async (trainerId, programId, data) => {
        const program = await this.workoutrepository.findById(programId);
        if (program?.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("Unauthorised Error");
        }
        const updated = await this.workoutrepository.update(programId, data);
        return updated;
    };
    deleteProgram = async (trainerId, programId) => {
        const program = await this.workoutrepository.findById(programId);
        if (program?.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("Trainer is not authorised");
        }
        await this.workoutrepository.delete(programId);
    };
    assignProgramtoUser = async (trainerId, programId, userId) => {
        const program = await this.workoutrepository.findById(programId);
        if (!program) {
            throw new NotFoundError("Program not found");
        }
        if (program.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("Trainer not authorised");
        }
        const updated = await this.workoutrepository.update(programId, { assignedUserId: userId });
        return updated;
    };
    getTrainerPrograms = async (trainerId) => {
        return this.workoutrepository.findByTrainer(trainerId);
    };
    getUserActivePrograms(userId) {
        return this.workoutrepository.findActiveForUsers(userId);
    }
};
WorkoutProgramService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IWorkoutProgramRepository)),
    __metadata("design:paramtypes", [Object])
], WorkoutProgramService);
export { WorkoutProgramService };
//# sourceMappingURL=WorkoutProgramService.js.map