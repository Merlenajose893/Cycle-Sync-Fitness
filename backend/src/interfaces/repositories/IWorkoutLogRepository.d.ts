import type { IWorkoutLog } from "../../models/WorkoutLog.js";
import type { IBaseRepository } from "./IBaseRepository.js";
export interface IWorkoutLogRepository extends IBaseRepository<IWorkoutLog> {
    findByUserAndDate(userId: string, date: Date): Promise<IWorkoutLog | null>;
    findByUserDateRange(userId: string, startDate: Date, endDate: Date): Promise<IWorkoutLog[]>;
    getExerciseHistory(userId: string, exerciseName: string, limit: number): Promise<IWorkoutLog[]>;
    findByUser(userId: string, page: number, limit: number): Promise<IWorkoutLog[]>;
    countByUser(userId: string): Promise<number>;
}
//# sourceMappingURL=IWorkoutLogRepository.d.ts.map