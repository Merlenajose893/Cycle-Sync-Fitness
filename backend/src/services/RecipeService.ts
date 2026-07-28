import { inject, injectable } from "tsyringe";
import type { CreateRecipeDTO, RecipeFilters, ReviewDTO, UpdateRecipeDTO } from "../dtos/recipe.dto.js";
import type { IRecipeService } from "../interfaces/services/IRecipeService.js";
import type { IRecipe } from "../models/Recpe.js";
import type { PaginatedResult } from "../types/paginated.result.js";
import { TOKENS } from "../container/tokens.js";
import type { IRecipeRepository } from "../interfaces/repositories/IRecipeRepository.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/index.js";
@injectable()
export class RecipeService implements IRecipeService{
    constructor(@inject(TOKENS.IRecipeRepository) private reciperepository:IRecipeRepository)
    {

    }
    createRecipe=async(trainerId: string, data: CreateRecipeDTO): Promise<IRecipe> =>{
        const recipe=await this.reciperepository.create({
            trainerId,
            ...data,
            favorites:[],
            reviews:[],
            averageRating:0

        } as unknown as Partial<IRecipe>)

        return recipe 
    }
    updateRecipe=async(trainerId: string, recipeId: string, data: UpdateRecipeDTO): Promise<IRecipe> =>{
        const recipe=await this.reciperepository.findById(recipeId);
        if(!recipe)
        {
            throw new NotFoundError("Recipe not found")
        }
        if(recipe.trainerId.toString()!==trainerId)
        {
            throw new UnauthorizedError("Trainer is not authorised")
        }
        Object.assign(recipe,data);
        return await this.reciperepository.save(recipe)
    }
    deleteRecipe=async(trainerId: string, recipeId: string): Promise<void>=> {
        const recipe=await this.reciperepository.findById(recipeId);
        if(!recipe)
        {
            throw new NotFoundError("Recipe not found")
        }

        if(recipe.trainerId.toString()!==trainerId)
        {
            throw new UnauthorizedError("Trainer is unauthorised")
        }

        return this.reciperepository.deleteById(recipeId);

    }
    getRecipeById=async(recipeId: string): Promise<IRecipe> =>{
        const recipe=await this.reciperepository.findById(recipeId);
        if(!recipe)
        {
            throw new NotFoundError("Recipe Not Found")
        }
        return recipe;
    }
    searchRecipes=async(query: string, page: number, limit: number): Promise<PaginatedResult<IRecipe>> =>{
        const recipes=await this.reciperepository.searchByTitle(query,page,limit);
        const totalItems=await this.reciperepository.countPublished({search:query});
         const totalPages =
    Math.ceil(totalItems / limit);
        return{
            data:recipes,
            meta:{
            page,

            limit,

            totalItems,

            totalPages,

            hasNextPage: page < totalPages,

            hasPreviousPage: page > 1
            }
            
        }
    }
    getTrainerRecipes=async(trainerId: string): Promise<IRecipe[]> =>{
        const trainerRecipes=await this.reciperepository.findByTrainer(trainerId);
        return trainerRecipes;
    }
    toggleFavourite=async(userId: string, recipeId: string): Promise<IRecipe> =>{
        const recipe=await this.reciperepository.findById(recipeId);
        if(!recipe)
        {
            throw new NotFoundError("Recipe Not Found")
        }

        const isFavourite=recipe.favorites.some((id)=>id.toString()===userId);
        if(isFavourite)
        {
            recipe.favorites=recipe.favorites.filter((id)=>id.toString()!==userId)
        }
        else{
            recipe.favorites.push(userId);
        }
        return await this.reciperepository.save(recipe)
    }
    getUsersFavourite=async(userId: string): Promise<IRecipe[]> =>{
        const favouritesByUser=await this.reciperepository.findFavouritesByUser(userId);
        return favouritesByUser;
    }
    getPublishedRecipes=async(filters: RecipeFilters, page: number, limit: number): Promise<PaginatedResult<IRecipe>> =>{
        const recipes=await this.reciperepository.findPublished(filters,page,limit)
        const totalItems=await this.reciperepository.countPublished(filters);
        const totalPages=Math.ceil(totalItems/limit);
        return{
            data:recipes,
            meta:{
                page,
                limit,
                totalPages,
                totalItems, 
                hasNextPage,
                hasPreviousPage
            }
        }
    }
    addReview=async(userId: string, recipeId: string, data: ReviewDTO): Promise<IRecipe> =>{
        const recipe=await this.reciperepository.findById(recipeId);
        if(!recipe)
        {
            throw new NotFoundError("Recipe not found")
        }
        const alreadyReviewed=recipe.reviews.some((id)=>id.userId.toString()===userId);
        if(alreadyReviewed)
        {
            throw new BadRequestError("You already reviewed this recipe")
        }

        recipe.reviews.push({
            userId,
            rating:data.rating,
            comment:data.comment,
            createdAt:new Date()
        })

        recipe.averageRating=this.calculateAverageRating(recipe.reviews)


    return await this.reciperepository.save(
        recipe
    );
    }

    private calculateAverageRating(
    reviews:any[]
):number{


    if(reviews.length === 0){

        return 0;

    }



    const total =
    reviews.reduce(
        (sum,review)=>
        sum + review.rating,
        0
    );


    return Number(
        (total / reviews.length)
        .toFixed(1)
    );

}
}