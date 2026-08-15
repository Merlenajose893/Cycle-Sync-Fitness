import { WorkoutCategory, CyclePhase, WorkoutDifficulty, WorkoutGoal } from "../constants/workout.js";
import mongoose, { Document, Types } from "mongoose";
export interface ITargetExercise {
    exerciseName: string;
    category: WorkoutCategory;
    targetSets: number;
    targetReps: number;
    targetWeightKg?: number;
    restSeconds: number;
    notes?: string;
}
export interface IWorkoutProgramDay {
    dayNumber: number;
    title: string;
    focusPhase: CyclePhase;
    exercises: ITargetExercise[];
}
export interface IWorkoutProgram extends Document {
    trainerId: Types.ObjectId;
    title: string;
    description: string;
    durationWeeks: number;
    daysPerWeek: number;
    difficulty: WorkoutDifficulty;
    goal: WorkoutGoal;
    days: IWorkoutProgramDay[];
    isTemplate: boolean;
    assignedUserId?: Types.ObjectId;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const WorkoutProgram: mongoose.Model<IWorkoutProgram, {}, {}, {}, mongoose.Document<unknown, {}, IWorkoutProgram, {}, mongoose.DefaultSchemaOptions> & IWorkoutProgram & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkoutProgram>;
//# sourceMappingURL=WorkoutProgram.d.ts.map