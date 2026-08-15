import type { CreateRecipeDTO, RecipeFilters, ReviewDTO, UpdateRecipeDTO } from "../dtos/recipe.dto.js";
import type { IRecipeService } from "../interfaces/services/IRecipeService.js";
import type { IRecipe } from "../models/Recpe.js";
import type { PaginatedResult } from "../types/paginated.result.js";
import type { IRecipeRepository } from "../interfaces/repositories/IRecipeRepository.js";
import type { IImageService } from "../interfaces/services/IImageService.js";
export declare class RecipeService implements IRecipeService {
    private reciperepository;
    private imageService;
    constructor(reciperepository: IRecipeRepository, imageService: IImageService);
    createRecipe: (trainerId: string, data: CreateRecipeDTO, file: Express.Multer.File) => Promise<IRecipe>;
    updateRecipe: (trainerId: string, recipeId: string, data: UpdateRecipeDTO) => Promise<IRecipe>;
    deleteRecipe: (trainerId: string, recipeId: string) => Promise<void>;
    getRecipeById: (recipeId: string) => Promise<IRecipe>;
    searchRecipes: (query: string, page: number, limit: number) => Promise<PaginatedResult<IRecipe>>;
    getTrainerRecipes: (trainerId: string) => Promise<IRecipe[]>;
    toggleFavourite: (userId: string, recipeId: string) => Promise<IRecipe>;
    getUsersFavourite: (userId: string) => Promise<IRecipe[]>;
    getPublishedRecipes: (filters: RecipeFilters, page: number, limit: number) => Promise<PaginatedResult<IRecipe>>;
    addReview: (userId: string, recipeId: string, data: ReviewDTO) => Promise<IRecipe>;
    private calculateAverageRating;
}
//# sourceMappingURL=RecipeService.d.ts.map