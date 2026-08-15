import mongoose, { Types, Document } from "mongoose";
import { Difficulty, DietType, RecipeCategory } from "../constants/food.constants.js";
export interface IIngredient {
    name: string;
    quantity: string | number;
}
export interface IMacrosPerServing {
    calories: number;
    fat: number;
    fats?: number;
    protein: number;
    carbs: number;
}
export interface IReview {
    userId: Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
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
export declare const RecipeModel: mongoose.Model<IRecipe, {}, {}, {}, mongoose.Document<unknown, {}, IRecipe, {}, mongoose.DefaultSchemaOptions> & IRecipe & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRecipe>;
//# sourceMappingURL=Recpe.d.ts.map