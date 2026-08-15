import { WorkoutSource } from "../constants/workout.js";
import mongoose, { Document, Types } from "mongoose";
export interface ILoggedSet {
    setNumber: number;
    repsCompleted: number;
    weightKg: number;
    rpe?: number;
    isCompleted: boolean;
}
export interface ILoggedExercise {
    exerciseName: string;
    category: string;
    sets: ILoggedSet[];
}
export interface IWorkoutLog extends Document {
    userId: Types.ObjectId;
    date: Date;
    source: WorkoutSource;
    programId?: Types.ObjectId;
    workoutTitle: string;
    durationMinutes: number;
    totalVolumeKg: number;
    totalSetsCompleted: number;
    exercises: ILoggedExercise[];
    imageUrl?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const WorkoutLog: mongoose.Model<IWorkoutLog, {}, {}, {}, mongoose.Document<unknown, {}, IWorkoutLog, {}, mongoose.DefaultSchemaOptions> & IWorkoutLog & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkoutLog>;
//# sourceMappingURL=WorkoutLog.d.ts.map