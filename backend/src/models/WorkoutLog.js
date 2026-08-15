import { WorkoutSource } from "../constants/workout.js";
import mongoose, { Schema, Document, Types } from "mongoose";
const LoggedSetSchema = new Schema({
    setNumber: {
        type: Number,
        required: true
    },
    repsCompleted: {
        type: Number,
        required: true,
        min: 0
    },
    weightKg: {
        type: Number,
        required: true,
        min: 0
    },
    rpe: {
        type: Number,
        min: 1,
        max: 10
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    _id: false
});
const LoggedExerciseSchema = new Schema({
    exerciseName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sets: [
        LoggedSetSchema
    ]
}, {
    _id: false
});
const WorkoutLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    source: {
        type: String,
        enum: Object.values(WorkoutSource),
        required: true
    },
    programId: {
        type: Schema.Types.ObjectId,
        ref: "WorkoutProgram"
    },
    workoutTitle: {
        type: String,
        required: true
    },
    durationMinutes: {
        type: Number,
        required: true,
        min: 0
    },
    totalVolumeKg: {
        type: Number,
        default: 0
    },
    totalSetsCompleted: {
        type: Number,
        default: 0
    },
    exercises: [
        LoggedExerciseSchema
    ],
    notes: String,
    imageUrl: String
}, {
    timestamps: true
});
export const WorkoutLog = mongoose.model("WorkoutLog", WorkoutLogSchema);
//# sourceMappingURL=WorkoutLog.js.map