import { Router } from "express";
import { container } from "tsyringe";

import { RecipeController } from "../controllers/RecipeController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { trainerAuthMiddleware } from "../middlewares/trainerAuthMiddleware.js";
import { validate } from "../middlewares/validate.js";

import {
    createRecipeSchema,
    updateRecipeSchema,
    reviewSchema
} from "../validators/recipe.validator.js";

const router = Router();

const recipeController = container.resolve(RecipeController);

router.post(
    "/",
    trainerAuthMiddleware,
    validate(createRecipeSchema),
    recipeController.createRecipe
);

router.put(
    "/:id",
    trainerAuthMiddleware,
    validate(updateRecipeSchema),
    recipeController.updateRecipe
);

router.delete(
    "/:id",
    trainerAuthMiddleware,
    recipeController.deleteRecipe
);

router.get(
    "/mine",
    trainerAuthMiddleware,
    recipeController.getTrainerRecipes
);

router.get(
    "/",
    authMiddleware,
    recipeController.getPublishedRecipes
);

router.get(
    "/search",
    authMiddleware,
    recipeController.searchRecipes
);

router.get(
    "/favorites",
    authMiddleware,
    recipeController.getUserFavorites
);

router.post(
    "/:id/favorite",
    authMiddleware,
    recipeController.toggleFavorite
);

router.post(
    "/:id/review",
    authMiddleware,
    validate(reviewSchema),
    recipeController.addReview
);

router.get(
    "/:id",
    authMiddleware,
    recipeController.getRecipeById
);

export default router;