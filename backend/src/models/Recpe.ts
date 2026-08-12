import mongoose, { Types ,Schema,Document} from "mongoose";
import { Difficulty,DietType,RecipeCategory } from "../constants/food.constants.js";
export interface IIngredient{
    name:string;
    quantity:string | number;
}

export interface IMacrosPerServing{
    calories:number;
    fat:number;
    fats?:number;
    protein:number;
    carbs:number;
}

export interface IReview{
    userId:Types.ObjectId;
    rating:number;
    comment?:string;
    createdAt:Date;
}

export interface IRecipe extends Document {
    trainerId: Types.ObjectId;

    title: string;

    description: string;

    imageUrl?: string;

    category: RecipeCategory;

    dietType: DietType;

    prepTime: number;

    cookTime: number;

    servings: number;

    difficulty: Difficulty;

    ingredients: IIngredient[];

    instructions: string[];

    macrosPerServing: IMacrosPerServing;

    favorites: Types.ObjectId[];

    reviews: IReview[];

    averageRating: number;

    isPublished: boolean;

    createdAt: Date;

    updatedAt: Date;
}

const ingredientSchema=new Schema<IIngredient>({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Schema.Types.Mixed,
        default:'1'
    }
},{_id:false})

const macrosPerServingSchema=new Schema<IMacrosPerServing>({
    calories:{
        type:Number,
        required:true,
        min:0
    },
    protein:{
        type:Number,
        required:true,
        min:0
    },
    carbs:{
        type:Number,
        required:true,
        min:0
    },
    fat:{
        type:Number,
        required:false,
        default:0,
        min:0
    },
    fats:{
        type:Number,
        required:false,
        default:0,
        min:0
    }
},{_id:false})


const ReviewSchema=new Schema<IReview>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{_id:false})

const RecipeSchema=new Schema<IRecipe>({
trainerId:{
    type:Schema.Types.ObjectId,
    ref:"Trainer",
    required:true
},
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
imageUrl:{
    type:String,
    
},
category:{
    type:String,
    enum:Object.values(RecipeCategory),
    required:true
},
dietType:{
    type:String,
    enum:Object.values(DietType),
    default:DietType.NO_RESTRICTION

},
prepTime: {
      type: Number,
      required: true,
      min: 0,
    },

    cookTime: {
      type: Number,
      required: true,
      min: 0,
    },

    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      default: Difficulty.EASY,
    },

    ingredients: {
      type: [ingredientSchema],
      default: [],
    },

    instructions: {
      type: [String],
      default: [],
    },

    macrosPerServing: {
      type: macrosPerServingSchema,
      required: true,
    },

    favorites: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },

    reviews: {
      type: [ReviewSchema],
      default: [],
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  
},{timestamps:true})

export const RecipeModel=mongoose.model<IRecipe>("Recipe",RecipeSchema)