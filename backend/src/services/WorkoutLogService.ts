import { inject, injectable } from "tsyringe";
import type { IWorkoutLogService } from "../interfaces/services/IWorkoutLogService.js";
import { TOKENS } from "../container/tokens.js";
import type { IWorkoutLogRepository } from "../interfaces/repositories/IWorkoutLogRepository.js";
import type { LogWorkoutDTO, LoggedExerciseDTO } from "../dtos/workout.dto.js";
import type { IWorkoutLog } from "../models/WorkoutLog.js";

@injectable()
export class WorkoutLogService implements IWorkoutLogService {
    constructor(
        @inject(TOKENS.IWorkoutLogRepository)
        private readonly workoutLogRepository: IWorkoutLogRepository
    ) { }

    logWorkout = async (userId: string, data: LogWorkoutDTO): Promise<IWorkoutLog> => {
        const totalVolumeKg = this.calculateTotalVolume(data.exercises);
        const totalSetsCompleted = this.calculateCompletedSets(data.exercises);
        const normalizedDate = this.normalizeDate(data.date);

        const workoutLog = await this.workoutLogRepository.create({
            userId,
            date: normalizedDate,
            source: data.source,
            programId: data.programId,
            workoutTitle: data.workoutTitle,
            durationMinutes: data.durationMinutes,
            exercises: data.exercises,
            notes: data.notes,
            totalVolumeKg,
            totalSetsCompleted,
        } as unknown as Partial<IWorkoutLog>);

        return workoutLog;
    };


    getDailyLog = async (userId: string, date: string): Promise<IWorkoutLog | null> => {
        const normalizedDate = this.normalizeDate(date);

        return this.workoutLogRepository.findByUserAndDate(userId, normalizedDate);
    };


    getExerciseProgram = async (userId: string, exerciseName: string): Promise<IWorkoutLog[]> => {
        return this.workoutLogRepository.getExerciseHistory(userId, exerciseName, this.DEFAULT_HISTORY_LIMIT);
    };


    getWorkoutHistory = async (
        userId: string,
        page: number,
        limit: number
    ): Promise<{ logs: IWorkoutLog[]; total: number }> => {
        const [logs, total] = await Promise.all([
            this.workoutLogRepository.findByUser(userId, page, limit),
            this.workoutLogRepository.countByUser(userId),
        ]);

        return { logs, total };
    };



    private readonly DEFAULT_HISTORY_LIMIT = 50;

    private calculateTotalVolume(exercises: LoggedExerciseDTO[]): number {
        let totalVolume = 0;

        for (const exercise of exercises) {
            for (const set of exercise.sets) {
                if (set.isCompleted) {
                    totalVolume += set.repsCompleted * set.weightKg;
                }
            }
        }

        return totalVolume;
    }

    private calculateCompletedSets(exercises: LoggedExerciseDTO[]): number {
        let completedSets = 0;

        for (const exercise of exercises) {
            for (const set of exercise.sets) {
                if (set.isCompleted) {
                    completedSets += 1;
                }
            }
        }

        return completedSets;
    }


    private normalizeDate(date: string): Date {
        return new Date(date);
    }
}