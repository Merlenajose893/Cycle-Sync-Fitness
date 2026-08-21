// import type { IWorkoutLog } from "../../models/WorkoutLog.js";
import type { WorkoutProgramFilterDTO } from "../../dtos/workout.dto.js";
import type { IWorkoutProgram } from "../../models/WorkoutProgram.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IWorkorkoutProgramRepository extends IBaseRepository<IWorkoutProgram>{
    findByTrainer(trainerId:string):Promise<IWorkoutProgram[]>;
    findActiveForUsers(userId:string):Promise<IWorkoutProgram|null>;
    findTemplates(filter?:WorkoutProgramFilterDTO):Promise<IWorkoutProgram[]>;
    update(programId:string,data:Partial<IWorkoutProgram>):Promise<IWorkoutProgram|null>;
    delete(programId:string):Promise<IWorkoutProgram|null|void>;
}