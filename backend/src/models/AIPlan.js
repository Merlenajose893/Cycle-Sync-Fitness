import mongoose, { Schema, Types, Document } from "mongoose";
import { PlanStatus, Goal, FitnessLevel, DietPreference, WorkoutType, MealType, WeekDay, } from "../constants/aiPlan.js";
/* -------------------- Nested Schemas -------------------- */
const AIPlanInputSchema = new Schema({
    goal: {
        type: String,
        enum: Object.values(Goal),
        required: true,
    },
    fitnessLevel: {
        type: String,
        enum: Object.values(FitnessLevel),
        required: true,
    },
    daysPerWeek: {
        type: Number,
        required: true,
        min: 1,
        max: 7,
    },
    dietPreference: {
        type: String,
        enum: Object.values(DietPreference),
        required: true,
    },
}, { _id: false });
const PlanSummarySchema = new Schema({
    dailyCalories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    waterIntake: Number,
    sleepHours: Number,
}, { _id: false });
const WarmupSchema = new Schema({
    title: String,
    description: String,
    duration: Number,
}, { _id: false });
const CooldownSchema = new Schema({
    title: String,
    description: String,
    duration: Number,
}, { _id: false });
const ExerciseSchema = new Schema({
    name: String,
    muscleGroup: String,
    workoutType: {
        type: String,
        enum: Object.values(WorkoutType),
    },
    sets: Number,
    reps: String,
    rest: Number,
    tip: String,
}, { _id: false });
const WorkoutDaySchema = new Schema({
    day: {
        type: String,
        enum: Object.values(WeekDay),
    },
    title: String,
    duration: Number,
    warmup: WarmupSchema,
    exercises: [ExerciseSchema],
    cooldown: CooldownSchema,
}, { _id: false });
const MealSchema = new Schema({
    mealType: {
        type: String,
        enum: Object.values(MealType),
    },
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    ingredients: [String],
    notes: String,
}, { _id: false });
const MealDaySchema = new Schema({
    day: {
        type: String,
        enum: Object.values(WeekDay),
    },
    meals: [MealSchema],
}, { _id: false });
const RecommendationSchema = new Schema({
    recovery: String,
    supplements: [String],
    cycleAdvice: String,
    notes: String,
}, { _id: false });
/* -------------------- AI Plan Schema -------------------- */
const AIPlanSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(PlanStatus),
        default: PlanStatus.DRAFT,
    },
    inputs: {
        type: AIPlanInputSchema,
        required: true,
    },
    summary: {
        type: PlanSummarySchema,
        required: true,
    },
    workoutPlan: {
        type: [WorkoutDaySchema],
        default: [],
    },
    mealPlan: {
        type: [MealDaySchema],
        default: [],
    },
    recommendations: {
        type: RecommendationSchema,
        required: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model("AIPlan", AIPlanSchema);
//# sourceMappingURL=AIPlan.js.map