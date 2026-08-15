import type { IWorkoutLogRepository } from "../interfaces/repositories/IWorkoutLogRepository.js";
import { type IWorkoutLog } from "../models/WorkoutLog.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class WorkoutLogRepository extends BaseRepository<IWorkoutLog> implements IWorkoutLogRepository {
    constructor();
    findByUserAndDate(userId: string, date: Date): Promise<IWorkoutLog | null>;
    findByUserDateRange(userId: string, startDate: Date, endDate: Date): Promise<IWorkoutLog[]>;
    getExerciseHistory(userId: string, exerciseName: string, limit: number): Promise<IWorkoutLog[]>;
    findByUser(userId: string, page: number, limit: number): Promise<IWorkoutLog[]>;
    countByUser(userId: string): Promise<number>;
}
//# sourceMappingURL=WorkoutLogRepository.d.ts.map