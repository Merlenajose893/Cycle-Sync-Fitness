import type { WorkoutProgramFilterDTO } from "../dtos/workout.dto.js";
import type { IWorkorkoutProgramRepository } from "../interfaces/repositories/IWorkoutProgramRepository.js";
import { type IWorkoutProgram } from "../models/WorkoutProgram.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class WorkoutProgramRepository extends BaseRepository<IWorkoutProgram> implements IWorkorkoutProgramRepository {
    constructor();
    findByTrainer(trainerId: string): Promise<IWorkoutProgram[]>;
    findActiveForUsers(userId: string): Promise<IWorkoutProgram | null>;
    findTemplates(filter?: WorkoutProgramFilterDTO): Promise<IWorkoutProgram>;
    update(programId: string, data: Partial<IWorkoutProgram>): Promise<IWorkoutProgram | null>;
    delete(programId: string): Promise<void>;
}
//# sourceMappingURL=WorkoutProgramRepository.d.ts.map