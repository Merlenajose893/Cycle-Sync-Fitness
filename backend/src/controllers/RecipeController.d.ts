import type { IRecipeService } from "../interfaces/services/IRecipeService.js";
import type { Request, Response, NextFunction } from "express";
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: IRecipeService);
    createRecipe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateRecipe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteRecipe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTrainerRecipes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPublishedRecipes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    searchRecipes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getRecipeById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    toggleFavorite: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserFavorites: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=RecipeController.d.ts.map