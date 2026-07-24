// import type { IWorkoutLog } from "../../models/WorkoutLog.js";
import type { IWorkoutProgram } from "../../models/WorkoutProgram.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IWorkorkoutProgramRepository extends IBaseRepository<IWorkoutProgram>{
    findByTrainer(trainerId:string):Promise<IWorkoutProgram[]>;
    findActiveForUsers(userId:string):Promise<IWorkoutProgram|null>;
    update(programId:string,data:Partial<IWorkoutProgram>):Promise<IWorkoutProgram|null>
    delete(programId:string):Promise<void>;
    
}