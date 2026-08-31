import type { RecipeFilters, ReviewDTO } from "../../dtos/recipe.dto.ts";
import type { IRecipe } from "../../models/Recpe.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface IRecipeRepository extends IBaseRepository<IRecipe>{
    findByTrainer(trainerId:string):Promise<IRecipe[]>;
    findPublished(filters:RecipeFilters,page:number,limit:number):Promise<IRecipe[]>;
    countPublished(filters:RecipeFilters):Promise<number>;
    searchByTitle(query:string,page:number,limit:number):Promise<IRecipe[]>;
    findFavouritesByUser(userId:string):Promise<IRecipe[]>;
    addFavourites(recipeId:string,userId:string):Promise<IRecipe|null>
    removeFavourites(recipeId:string,userId:string):Promise<IRecipe|null>;
    addReview?(recipeId:string,review:ReviewDTO):Promise<IRecipe|null>;
}