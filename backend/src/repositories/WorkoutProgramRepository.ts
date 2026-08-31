import type { WorkoutProgramFilterDTO } from "../dtos/workout.dto.ts";
import type { IWorkorkoutProgramRepository } from "../interfaces/repositories/IWorkoutProgramRepository.ts";
import { WorkoutProgram, type IWorkoutProgram } from "../models/WorkoutProgram.ts";
import { BaseRepository } from "./BaseRepository.ts";

export class WorkoutProgramRepository extends BaseRepository<IWorkoutProgram> implements IWorkorkoutProgramRepository{
constructor()
{
    super(WorkoutProgram)
}
async findByTrainer(trainerId: string): Promise<IWorkoutProgram[]> {
    return this.model.find({trainerId,isArchived:false})
}
async findActiveForUsers(userId: string): Promise<IWorkoutProgram | null> {
    return this.model.findOne({assignedUserId:userId,isArchived:false});
}

async findTemplates(filter?: WorkoutProgramFilterDTO): Promise<IWorkoutProgram[]> {
    return this.model.find({isTemplate:true,isArchived:true,...filter});
}

async update(programId: string, data: Partial<IWorkoutProgram>): Promise<IWorkoutProgram | null> {
    return this.model.findByIdAndUpdate(programId,data,{new:true})
}
async delete(programId: string) {
    return this.model.findByIdAndUpdate(programId,{isArchived:true},{new:true})
}
}