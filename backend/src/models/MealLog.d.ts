import { Document } from "mongoose";
import mongoose from "mongoose";
import { MealType } from "../constants/food.constants.js";
export interface IFoodItem {
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}
export interface IMealEntry {
    mealType: MealType;
    foods: IFoodItem[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    loggedAt: Date;
}
export interface IDailyTarget {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}
export interface IMealLog extends Document {
    userId: Types.ObjectId;
    date: Date;
    meals: IMealEntry[];
    dailyTarget: IDailyTarget;
}
export declare const MealLog: mongoose.Model<IMealLog, {}, {}, {}, Document<unknown, {}, IMealLog, {}, mongoose.DefaultSchemaOptions> & IMealLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMealLog>;
export default MealLog;
//# sourceMappingURL=MealLog.d.ts.map