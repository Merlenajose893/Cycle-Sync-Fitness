import type { RecipeFilters } from "../dtos/recipe.dto.js";
import type { IRecipeRepository } from "../interfaces/repositories/IRecipeRepository.js";
import { type IRecipe } from "../models/Recpe.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class RecipeRepository extends BaseRepository<IRecipe> implements IRecipeRepository {
    constructor();
    findByTrainer(trainerId: string): Promise<IRecipe[]>;
    findFavouritesByUser(userId: string): Promise<IRecipe[]>;
    findPublished(filters: RecipeFilters, page: number, limit: number): Promise<IRecipe[]>;
    countPublished(filters: RecipeFilters): Promise<number>;
    searchByTitle(query: string, page: number, limit: number): Promise<IRecipe[]>;
    addFavourites(recipeId: string, userId: string): Promise<IRecipe | null>;
    removeFavourites(recipeId: string, userId: string): Promise<IRecipe | null>;
}
//# sourceMappingURL=RecipeRepository.d.ts.map