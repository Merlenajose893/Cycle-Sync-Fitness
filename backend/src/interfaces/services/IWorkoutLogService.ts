import type { LogWorkoutDTO } from "../../dtos/workout.dto.ts";
import type { IWorkoutLog } from "../../models/WorkoutLog.ts";

export interface IWorkoutLogService{
    logWorkout(userId:string,data:LogWorkoutDTO):Promise<IWorkoutLog>;
    getDailyLog(userId:string,date:string):Promise<IWorkoutLog|null>;
    getWorkoutHistory(userId:string,page:number,limit:number):Promise<{logs:IWorkoutLog[];total:number}>
    getExerciseProgram(userId:string,exerciseName:string):Promise<IWorkoutLog[]>;
}