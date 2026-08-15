import { Schema, Document } from "mongoose";
import mongoose from "mongoose";
import { MealType } from "../constants/food.constants.js";
const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: true,
        min: 0
    },
    carbs: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    protein: {
        type: Number,
        required: true,
        min: 0
    },
    fat: {
        type: Number,
        required: true,
        min: 0
    },
}, { _id: false });
const mealEntrySchema = new Schema({
    mealType: {
        type: String,
        enum: Object.values(MealType),
        required: true
    },
    foods: {
        type: [foodSchema],
        default: []
    },
    totalCalories: {
        type: Number,
        default: 0,
        min: 0
    },
    totalCarbs: {
        type: Number,
        default: 0,
        min: 0
    },
    totalProtein: {
        type: Number,
        default: 0,
        min: 0
    },
    totalFat: {
        type: Number,
        default: 0,
        min: 0
    },
    loggedAt: {
        type: Date,
        default: Date.now()
    }
}, { _id: false });
const dailyTargetSchema = new Schema({
    calories: {
        type: Number,
        default: 0,
        min: 0,
    },
    protein: {
        type: Number,
        default: 0,
        min: 0,
    },
    carbs: {
        type: Number,
        default: 0,
        min: 0,
    },
    fats: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { _id: false });
const MealLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    date: {
        type: Date,
        required: true,
    },
    meals: {
        type: [mealEntrySchema],
        default: [],
    },
    dailyTarget: {
        type: dailyTargetSchema,
        default: () => ({
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        }),
    },
}, {
    timestamps: true,
});
export const MealLog = mongoose.model("MealLog", MealLogSchema);
export default MealLog;
//# sourceMappingURL=MealLog.js.map