import { injectable } from "tsyringe";
import type { IWorkoutLogRepository } from "../interfaces/repositories/IWorkoutLogRepository.ts";
import { WorkoutLog, type IWorkoutLog } from "../models/WorkoutLog.ts";
import { BaseRepository } from "./BaseRepository.ts";

@injectable()
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
    findByUser(userId: string, page: number, limit: number): Promise<IWorkoutLog[]> {
        const skip = (page - 1) * limit;
        return this.model.find({ userId }).sort({ date: -1 }).skip(skip).limit(limit);
    }
    countByUser(userId: string): Promise<number> {
        return this.model.countDocuments({ userId });
    }
}