import { injectable } from "tsyringe";
import type { RecipeFilters } from "../dtos/recipe.dto.js";
import type { IRecipeRepository } from "../interfaces/repositories/IRecipeRepository.js";
import { RecipeModel, type IRecipe } from "../models/Recpe.js";
import { BaseRepository } from "./BaseRepository.js";
@injectable()
export class RecipeRepository extends BaseRepository<IRecipe> implements IRecipeRepository{
    constructor()
    {
        super(RecipeModel)
    }

    async findByTrainer(trainerId: string): Promise<IRecipe[]> {
        return this.model.find({trainerId}).sort({createdAt:-1});
    }

  async  findFavouritesByUser(userId: string): Promise<IRecipe[]> {
        return this.model.find({favorites:userId});
    }

   async findPublished(filters: RecipeFilters, page: number, limit: number): Promise<IRecipe[]> {

        const skip=(page-1)*limit;
        const query:any={
            isPublished: { $ne: false }
        }
        if(filters.category)
        {
            query.category=filters.category
        }
        if(filters.dietType)
        {
            query.dietType=filters.dietType
        }
        if(filters.difficulty)
        {
            query.difficulty=filters.difficulty
        }

        return this.model.find(query).skip(skip).limit(limit).sort({createdAt:-1})
    }

   async countPublished(filters: RecipeFilters): Promise<number> {
        const query:any={
            isPublished: { $ne: false }
        }
        if(filters.category)
        {
            query.category=filters.category
        }
        if(filters.dietType)
        {
            query.dietType=filters.dietType;
        }
        if(filters.difficulty)
        {
            query.difficulty=filters.difficulty
        }

        return this.model.countDocuments(query)
    }

   async searchByTitle(query: string, page: number, limit: number): Promise<IRecipe[]> {
        let skip=(page-1)*limit;
        return this.model.find({
            title: { $regex: query, $options: "i" },
            isPublished: { $ne: false }
        }).skip(skip).limit(limit).sort({createdAt:-1})
    }

    async addFavourites(recipeId: string, userId: string): Promise<IRecipe | null> {
        return this.model.findByIdAndUpdate(recipeId,{$addToSet:{favorites:userId}},{new:true})
    }
   async removeFavourites(recipeId: string, userId: string): Promise<IRecipe | null> {
        return this.model.findByIdAndUpdate(recipeId,{$pull:{favorites:userId}},{new:true})
    }
}