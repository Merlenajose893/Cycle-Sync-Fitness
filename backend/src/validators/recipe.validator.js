import { z } from "zod";
import { DietType, Difficulty, RecipeCategory, } from "../constants/food.constants.js";
const ingredientSchema = z.object({
    name: z
        .string()
        .min(2, "Ingredient name is required"),
    quantity: z
        .string()
        .min(1, "Quantity is required"),
});
const macrosSchema = z.object({
    calories: z
        .coerce.number()
        .min(0),
    protein: z
        .coerce.number()
        .min(0),
    carbs: z
        .coerce.number()
        .min(0),
    fat: z
        .coerce.number()
        .min(0),
});
export const createRecipeSchema = z.object({
    title: z
        .string()
        .min(3, "Title must contain at least 3 characters"),
    description: z
        .string()
        .min(10, "Description is too short"),
    imageUrl: z
        .string()
        .url()
        .optional(),
    category: z.enum([
        RecipeCategory.BREAKFAST,
        RecipeCategory.LUNCH,
        RecipeCategory.DINNER,
        RecipeCategory.SNACK,
        RecipeCategory.DESERT,
        RecipeCategory.SMOOTHIE,
    ]),
    dietType: z.enum([
        DietType.NO_RESTRICTION,
        DietType.VEGETARIAN,
        DietType.VEGAN,
        DietType.KETO,
        DietType.PALEO,
    ]),
    prepTime: z
        .coerce.number()
        .nonnegative(),
    cookTime: z
        .coerce.number()
        .nonnegative(),
    servings: z
        .coerce.number()
        .positive(),
    difficulty: z.enum([
        Difficulty.EASY,
        Difficulty.MEDIUM,
        Difficulty.HARD,
    ]),
    ingredients: z
        .array(ingredientSchema)
        .min(1),
    instructions: z
        .array(z.string().min(3))
        .min(1),
    macrosPerServing: macrosSchema,
    isPublished: z
        .boolean()
        .optional()
});
export const updateRecipeSchema = createRecipeSchema.partial();
export const reviewSchema = z.object({
    rating: z
        .number()
        .min(1)
        .max(5),
    comment: z
        .string()
        .max(500)
        .optional()
});
//# sourceMappingURL=recipe.validator.js.map