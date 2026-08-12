import { inject, injectable } from "tsyringe";
import type { IWorkoutLogService } from "../interfaces/services/IWorkoutLogService.js";
import { TOKENS } from "../container/tokens.js";
import type { IWorkoutLogRepository } from "../interfaces/repositories/IWorkoutLogRepository.js";
import type { LogWorkoutDTO, LoggedExerciseDTO } from "../dtos/workout.dto.js";
import type { IWorkoutLog } from "../models/WorkoutLog.js";

import type { IImageService } from "../interfaces/services/IImageService.js";

@injectable()
export class WorkoutLogService implements IWorkoutLogService {
    constructor(
        @inject(TOKENS.IWorkoutLogRepository)
        private readonly workoutLogRepository: IWorkoutLogRepository,
        @inject(TOKENS.IImageService)
        private readonly imageService?: IImageService
    ) { }

    logWorkout = async (userId: string, data: any, file?: Express.Multer.File): Promise<IWorkoutLog> => {
        let imageUrl = data.imageUrl || "";
        if (file && this.imageService) {
            try {
                const uploadResult = await this.imageService.uploadImage(file);
                imageUrl = uploadResult.url;
            } catch (err) {
                console.error("Failed to upload workout image:", err);
            }
        }

        const exercises = Array.isArray(data.exercises) ? data.exercises : [];
        const totalVolumeKg = this.calculateTotalVolume(exercises);
        const totalSetsCompleted = this.calculateCompletedSets(exercises);
        const normalizedDate = this.normalizeDate(data.date);

        const workoutLog = await this.workoutLogRepository.create({
            userId,
            date: normalizedDate,
            source: data.source || "TRAINER_PROGRAM",
            programId: data.programId || data.workoutProgramId,
            workoutTitle: data.workoutTitle || "Logged Workout",
            durationMinutes: Number(data.durationMinutes || 30),
            caloriesBurned: Number(data.caloriesBurned || 0),
            exercises,
            notes: data.notes || "",
            imageUrl,
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

    private calculateTotalVolume(exercises: any[]): number {
        if (!Array.isArray(exercises)) return 0;
        let totalVolume = 0;

        for (const exercise of exercises) {
            if (Array.isArray(exercise.sets)) {
                for (const set of exercise.sets) {
                    if (set.isCompleted) {
                        totalVolume += (set.repsCompleted || 0) * (set.weightKg || 0);
                    }
                }
            }
        }

        return totalVolume;
    }

    private calculateCompletedSets(exercises: any[]): number {
        if (!Array.isArray(exercises)) return 0;
        let completedSets = 0;

        for (const exercise of exercises) {
            if (Array.isArray(exercise.sets)) {
                for (const set of exercise.sets) {
                    if (set.isCompleted) {
                        completedSets += 1;
                    }
                }
            }
        }

        return completedSets;
    }


    private normalizeDate(date: string): Date {
        if (!date) return new Date();
        const d = new Date(date);
        return isNaN(d.getTime()) ? new Date() : d;
    }
}