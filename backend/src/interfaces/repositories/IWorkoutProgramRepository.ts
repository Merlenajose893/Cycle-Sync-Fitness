// import type { IWorkoutLog } from "../../models/WorkoutLog.ts";
import type { WorkoutProgramFilterDTO } from "../../dtos/workout.dto.ts";
import type { IWorkoutProgram } from "../../models/WorkoutProgram.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface IWorkorkoutProgramRepository extends IBaseRepository<IWorkoutProgram>{
    findByTrainer(trainerId:string):Promise<IWorkoutProgram[]>;
    findActiveForUsers(userId:string):Promise<IWorkoutProgram|null>;
    findTemplates(filter?:WorkoutProgramFilterDTO):Promise<IWorkoutProgram[]>;
    update(programId:string,data:Partial<IWorkoutProgram>):Promise<IWorkoutProgram|null>;
    delete(programId:string):Promise<IWorkoutProgram|null|void>;
}