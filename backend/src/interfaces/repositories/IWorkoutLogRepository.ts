import type { IWorkoutLog } from "../../models/WorkoutLog.js";

export interface IWorkoutLogRepository {
    findByUserAndDate(userId:string,date:Date):Promise<IWorkoutLog|null>;
    findByUserDateRange(userId:string,startDate:Date,endDate:Date):Promise<IWorkoutLog[]>;
    getExerciseHistory(userId:string,exerciseName:string,limit:number):Promise<IWorkoutLog[]>;
    countByUser(userId:string):Promise<number>;
}