import type { IWorkoutLogService } from "../interfaces/services/IWorkoutLogService.js";
import type { IWorkoutLogRepository } from "../interfaces/repositories/IWorkoutLogRepository.js";
import type { IWorkoutLog } from "../models/WorkoutLog.js";
import type { IImageService } from "../interfaces/services/IImageService.js";
export declare class WorkoutLogService implements IWorkoutLogService {
    private readonly workoutLogRepository;
    private readonly imageService?;
    constructor(workoutLogRepository: IWorkoutLogRepository, imageService?: IImageService | undefined);
    logWorkout: (userId: string, data: any, file?: Express.Multer.File) => Promise<IWorkoutLog>;
    getDailyLog: (userId: string, date: string) => Promise<IWorkoutLog | null>;
    getExerciseProgram: (userId: string, exerciseName: string) => Promise<IWorkoutLog[]>;
    getWorkoutHistory: (userId: string, page: number, limit: number) => Promise<{
        logs: IWorkoutLog[];
        total: number;
    }>;
    private readonly DEFAULT_HISTORY_LIMIT;
    private calculateTotalVolume;
    private calculateCompletedSets;
    private normalizeDate;
}
//# sourceMappingURL=WorkoutLogService.d.ts.map