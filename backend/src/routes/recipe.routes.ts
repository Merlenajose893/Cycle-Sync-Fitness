import { Router } from "express";
import { container } from "tsyringe";

import { RecipeController } from "../controllers/RecipeController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleWare.js";
import { validate } from "../middlewares/validate.js";
import { upload } from "../middlewares/upload.js";

import {
    createRecipeSchema,
    updateRecipeSchema,
    reviewSchema
} from "../validators/recipe.validator.js";

const router = Router();

const recipeController = container.resolve(RecipeController);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("trainer"),
    upload.single("image"),
    validate(createRecipeSchema),
    recipeController.createRecipe
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("trainer"),
    upload.single("image"),
    validate(updateRecipeSchema),
    recipeController.updateRecipe
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("trainer"),
    recipeController.deleteRecipe
);

router.get(
    "/mine",
    authMiddleware,
    roleMiddleware("trainer"),
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