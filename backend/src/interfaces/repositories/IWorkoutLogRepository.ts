import type { IWorkoutLog } from "../../models/WorkoutLog.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IWorkoutLogRepository extends IBaseRepository<IWorkoutLog>{
    findByUserAndDate(usetId:string,date:Date):Promise<IWorkoutLog[]>
}