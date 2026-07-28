import { Schema ,Document} from "mongoose";
import mongoose from "mongoose";
import { MealType } from "../constants/food.constants.js";

export interface IFoodItem{
    name:string;
    quantity:number;
    unit:string;
    calories:number;
    protein:number;
    carbs:number;
    fat:number;
}

export interface IMealEntry{
    mealType:MealType;
    foods:IFoodItem[];
    totalCalories:number;
    totalProtein:number;
    totalCarbs:number;
    totalFat:number;
    loggedAt:Date;
}

export interface IDailyTarget{
    calories:number;
    protein:number;
    carbs:number;
    fats:number;
}

export interface IMealLog extends Document {

    userId: Types.ObjectId;

    date: Date;

    meals: IMealEntry[];

    dailyTarget: IDailyTarget;

}

const foodSchema=new Schema<IFoodItem>({
    name:{
        type:String,
        required:true
    },
    calories:{
        type:Number,
        required:true,
        min:0
    },
    unit:{
        type:String,
        required:true,
        min:0
    },
    carbs:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        required:true,
        min:0
    },
    protein:{
        type:Number,
        required:true,
        min:0
    },
    fat:{
        type:Number,
        required:true,
        min:0
    },
    
},{_id:false})

const mealEntrySchema=new Schema<IMealEntry>({
    mealType:{
        type:String,
        enum:Object.values(MealType),
        required:true
    },
    foods:{
        type:[foodSchema],
        default:[]
    },
    totalCalories:{
        type:Number,
        default:0,
        min:0
    },
    totalCarbs:{
        type:Number,
        default:0,
        min:0

    },
    totalProtein:{
        type:Number,
        default:0,
        min:0
    },
    totalFat:{
        type:Number,
        default:0,
        min:0
    },
    loggedAt:{
        type:Date,
        default:Date.now()
    }

},{_id:false})

const dailyTargetSchema=new Schema<IDailyTarget>({
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
  

},{_id:false})


const MealLogSchema = new Schema<IMealLog>(
  {
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
  },
  {
    timestamps: true,
  }
);


export const MealLog = mongoose.model<IMealLog>(
  "MealLog",
  MealLogSchema
);

export default MealLog;
