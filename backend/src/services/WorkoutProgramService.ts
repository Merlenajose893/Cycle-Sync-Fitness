import { inject, injectable } from "tsyringe";
import type { IWorkoutProgramService } from "../interfaces/services/IWorkoutProgramService.ts";
import { TOKENS } from "../container/tokens.ts";
import type { IWorkorkoutProgramRepository } from "../interfaces/repositories/IWorkoutProgramRepository.ts";
import type { CreateProgramDTO, UpdateProgramDTO } from "../dtos/workout.dto.ts";
import type { IWorkoutProgram } from "../models/WorkoutProgram.ts";
import { NotFoundError, UnauthorizedError } from "../errors/index.ts";
import { Types } from "mongoose";
@injectable()
export class WorkoutProgramService implements IWorkoutProgramService{
constructor(@inject(TOKENS.IWorkoutProgramRepository) private workoutrepository:IWorkorkoutProgramRepository)
{

}
createProgram=async(trainerId: string, data: CreateProgramDTO): Promise<IWorkoutProgram> =>{
   const program= await this.workoutrepository.create({
    trainerId:new Types.ObjectId(trainerId),
    ...data
   } as any)
   return program;
}
updateProgram=async(trainerId: string,  programId:string,data: UpdateProgramDTO): Promise<IWorkoutProgram|null>=> {
    const program=await this.workoutrepository.findById(programId);
    if(program?.trainerId.toString()!==trainerId)
    {
        throw new UnauthorizedError("Unauthorised Error")
    }
    const updated=await this.workoutrepository.update(programId,data);
    return updated;
}
deleteProgram=async(trainerId: string, programId: string): Promise<void> =>{
    const program=await this.workoutrepository.findById(programId);
    if(program?.trainerId.toString()!==trainerId)
    {
        throw new UnauthorizedError("Trainer is not authorised")
    }
    await this.workoutrepository.delete(programId)
}
assignProgramtoUser=async(trainerId: string, programId: string, userId: string): Promise<IWorkoutProgram|null> =>{
    const program=await this.workoutrepository.findById(programId);
    if(!program)
    {
        throw new NotFoundError("Program not found")
    }
    if(program.trainerId.toString()!==trainerId)
    {
        throw new UnauthorizedError("Trainer not authorised")
    }
    const updated=await this.workoutrepository.update(programId,{assignedUserId:new Types.ObjectId(userId)});
    return updated
}
getTrainerPrograms=async(trainerId: string): Promise<IWorkoutProgram[]> =>{
    return this.workoutrepository.findByTrainer(trainerId);
}

getUserActivePrograms(userId: string): Promise<IWorkoutProgram | null> {
    return this.workoutrepository.findActiveForUsers(userId)
}
}