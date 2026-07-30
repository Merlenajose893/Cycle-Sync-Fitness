import type { CreateRecipeDTO, RecipeFilters, ReviewDTO, UpdateRecipeDTO } from "../../dtos/recipe.dto.js";
import type { IRecipe } from "../../models/Recpe.js";
import type { PaginatedResult } from "../../types/paginated.result.js";

export interface IRecipeService{
    createRecipe(trainerId:string,data:CreateRecipeDTO,file:Express.Multer.File):Promise<IRecipe>;
    updateRecipe(trainerId:string,recipeId:string,data:UpdateRecipeDTO):Promise<IRecipe>;
    deleteRecipe(trainerId:string,recipeId:string):Promise<void>;
    getTrainerRecipes(trainerId:string):Promise<IRecipe[]>;
    getPublishedRecipes(filters:RecipeFilters,page:number,limit:number):Promise<PaginatedResult<IRecipe>>
    getRecipeById(recipeId:string):Promise<IRecipe>;
    searchRecipes(query:string,page:number,limit:number):Promise<PaginatedResult<IRecipe>>:
    toggleFavourite(userId:string,recipeId:string):Promise<IRecipe>;
    getUsersFavourite(userId:string):Promise<IRecipe[]>;
    addReview(userId:string,recipeId:string,data:ReviewDTO):Promise<IRecipe>;
}