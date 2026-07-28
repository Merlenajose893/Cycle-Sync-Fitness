import type { IWorkoutLogRepository } from "../interfaces/repositories/IWorkoutLogRepository.js";
import { WorkoutLog, type IWorkoutLog } from "../models/WorkoutLog.js";
import { BaseRepository } from "./BaseRepository.js";

export class WorkoutLogRepository extends BaseRepository<IWorkoutLog> implements IWorkoutLogRepository{
    constructor()
    {
        super(WorkoutLog)
    }

    findByUserAndDate(userId: string, date: Date): Promise<IWorkoutLog | null> {
        return this.model.findOne({userId,date});
    }
    findByUserDateRange(userId: string, startDate: Date, endDate: Date): Promise<IWorkoutLog[]> {
        return this.model.find({userId,date:{$gte:startDate,$lte:endDate}})
    }
    getExerciseHistory(userId: string, exerciseName: string, limit: number): Promise<IWorkoutLog[]> {
        return this.model.find({userId,"exercises.exerciseName":exerciseName}).sort({createdAt:-1});
    }
    countByUser(userId: string): Promise<number> {
        return this.model.countDocuments(userId);
    }
}