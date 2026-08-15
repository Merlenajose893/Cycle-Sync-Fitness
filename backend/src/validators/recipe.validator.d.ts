import { z } from "zod";
import { DietType, Difficulty, RecipeCategory } from "../constants/food.constants.js";
export declare const createRecipeSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodString>;
    category: z.ZodEnum<{
        BREAKFAST: RecipeCategory.BREAKFAST;
        LUNCH: RecipeCategory.LUNCH;
        SNACK: RecipeCategory.SNACK;
        DINNER: RecipeCategory.DINNER;
        DESERT: RecipeCategory.DESERT;
        SMOOTHIE: RecipeCategory.SMOOTHIE;
    }>;
    dietType: z.ZodEnum<{
        NO_RESTRICTION: DietType.NO_RESTRICTION;
        VEGETARIAN: DietType.VEGETARIAN;
        VEGAN: DietType.VEGAN;
        KETO: DietType.KETO;
        PALEO: DietType.PALEO;
    }>;
    prepTime: z.ZodCoercedNumber<unknown>;
    cookTime: z.ZodCoercedNumber<unknown>;
    servings: z.ZodCoercedNumber<unknown>;
    difficulty: z.ZodEnum<{
        EASY: Difficulty.EASY;
        MEDIUM: Difficulty.MEDIUM;
        HARD: Difficulty.HARD;
    }>;
    ingredients: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodString;
    }, z.core.$strip>>;
    instructions: z.ZodArray<z.ZodString>;
    macrosPerServing: z.ZodObject<{
        calories: z.ZodCoercedNumber<unknown>;
        protein: z.ZodCoercedNumber<unknown>;
        carbs: z.ZodCoercedNumber<unknown>;
        fat: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
    isPublished: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateRecipeSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodEnum<{
        BREAKFAST: RecipeCategory.BREAKFAST;
        LUNCH: RecipeCategory.LUNCH;
        SNACK: RecipeCategory.SNACK;
        DINNER: RecipeCategory.DINNER;
        DESERT: RecipeCategory.DESERT;
        SMOOTHIE: RecipeCategory.SMOOTHIE;
    }>>;
    dietType: z.ZodOptional<z.ZodEnum<{
        NO_RESTRICTION: DietType.NO_RESTRICTION;
        VEGETARIAN: DietType.VEGETARIAN;
        VEGAN: DietType.VEGAN;
        KETO: DietType.KETO;
        PALEO: DietType.PALEO;
    }>>;
    prepTime: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    cookTime: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    servings: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    difficulty: z.ZodOptional<z.ZodEnum<{
        EASY: Difficulty.EASY;
        MEDIUM: Difficulty.MEDIUM;
        HARD: Difficulty.HARD;
    }>>;
    ingredients: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodString;
    }, z.core.$strip>>>;
    instructions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    macrosPerServing: z.ZodOptional<z.ZodObject<{
        calories: z.ZodCoercedNumber<unknown>;
        protein: z.ZodCoercedNumber<unknown>;
        carbs: z.ZodCoercedNumber<unknown>;
        fat: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>>;
    isPublished: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const reviewSchema: z.ZodObject<{
    rating: z.ZodNumber;
    comment: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=recipe.validator.d.ts.map