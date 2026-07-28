import type { WorkoutProgramFilterDTO } from "../dtos/workout.dto.js";
import type { IWorkorkoutProgramRepository } from "../interfaces/repositories/IWorkoutProgramRepository.js";
import { WorkoutProgram, type IWorkoutProgram } from "../models/WorkoutProgram.js";
import { BaseRepository } from "./BaseRepository.js";

export class WorkoutProgramRepository extends BaseRepository<IWorkoutProgram> implements IWorkorkoutProgramRepository{
constructor()
{
    super(WorkoutProgram)
}
async findByTrainer(trainerId: string): Promise<IWorkoutProgram[]> {
    return this.model.find({trainerId,isArchived:false})
}
async findActiveForUsers(userId: string): Promise<IWorkoutProgram | null> {
    return this.model.find({assignedUserId:userId,isArchived:false})
}

async findTemplates(filter?: WorkoutProgramFilterDTO): Promise<IWorkoutProgram> {
    return this.model.find({isTemplate:true,isArchived:true,...filter});
}

async update(programId: string, data: Partial<IWorkoutProgram>): Promise<IWorkoutProgram | null> {
    return this.model.findByIdAndUpdate(programId,data,{new:true})
}
async delete(programId: string): Promise<void> {
    return this.model.findByIdAndUpdate(programId,{isArchived:true},{new:true})
}
}