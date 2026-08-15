var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
let WorkoutLogService = class WorkoutLogService {
    workoutLogRepository;
    imageService;
    constructor(workoutLogRepository, imageService) {
        this.workoutLogRepository = workoutLogRepository;
        this.imageService = imageService;
    }
    logWorkout = async (userId, data, file) => {
        let imageUrl = data.imageUrl || "";
        if (file && this.imageService) {
            try {
                const uploadResult = await this.imageService.uploadImage(file);
                imageUrl = uploadResult.url;
            }
            catch (err) {
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
        });
        return workoutLog;
    };
    getDailyLog = async (userId, date) => {
        const normalizedDate = this.normalizeDate(date);
        return this.workoutLogRepository.findByUserAndDate(userId, normalizedDate);
    };
    getExerciseProgram = async (userId, exerciseName) => {
        return this.workoutLogRepository.getExerciseHistory(userId, exerciseName, this.DEFAULT_HISTORY_LIMIT);
    };
    getWorkoutHistory = async (userId, page, limit) => {
        const [logs, total] = await Promise.all([
            this.workoutLogRepository.findByUser(userId, page, limit),
            this.workoutLogRepository.countByUser(userId),
        ]);
        return { logs, total };
    };
    DEFAULT_HISTORY_LIMIT = 50;
    calculateTotalVolume(exercises) {
        if (!Array.isArray(exercises))
            return 0;
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
    calculateCompletedSets(exercises) {
        if (!Array.isArray(exercises))
            return 0;
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
    normalizeDate(date) {
        if (!date)
            return new Date();
        const d = new Date(date);
        return isNaN(d.getTime()) ? new Date() : d;
    }
};
WorkoutLogService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IWorkoutLogRepository)),
    __param(1, inject(TOKENS.IImageService)),
    __metadata("design:paramtypes", [Object, Object])
], WorkoutLogService);
export { WorkoutLogService };
//# sourceMappingURL=WorkoutLogService.js.map