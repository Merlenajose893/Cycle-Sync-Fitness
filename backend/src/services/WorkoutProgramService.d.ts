import type { IWorkoutProgramService } from "../interfaces/services/IWorkoutProgramService.js";
import type { IWorkorkoutProgramRepository } from "../interfaces/repositories/IWorkoutProgramRepository.js";
import type { CreateProgramDTO, UpdateProgramDTO } from "../dtos/workout.dto.js";
import type { IWorkoutProgram } from "../models/WorkoutProgram.js";
export declare class WorkoutProgramService implements IWorkoutProgramService {
    private workoutrepository;
    constructor(workoutrepository: IWorkorkoutProgramRepository);
    createProgram: (trainerId: string, data: CreateProgramDTO) => Promise<IWorkoutProgram>;
    updateProgram: (trainerId: string, programId: string, data: UpdateProgramDTO) => Promise<IWorkoutProgram | null>;
    deleteProgram: (trainerId: string, programId: string) => Promise<void>;
    assignProgramtoUser: (trainerId: string, programId: string, userId: string) => Promise<IWorkoutProgram | null>;
    getTrainerPrograms: (trainerId: string) => Promise<IWorkoutProgram[]>;
    getUserActivePrograms(userId: string): Promise<IWorkoutProgram | null>;
}
//# sourceMappingURL=WorkoutProgramService.d.ts.map