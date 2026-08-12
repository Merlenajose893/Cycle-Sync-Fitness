import { DietType,RecipeCategory,Difficulty } from "../constants/food.constants.js";

export interface IngredientDTO {
  name: string;
  quantity: string | number;
}

export interface MacrosPerServingDTO {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fats?: number;
}

export interface CreateRecipeDTO {
  title: string;
  description: string;
  imageUrl?: string;

  category: RecipeCategory;
  dietType: DietType;

  prepTime: number;
  cookTime: number;
  servings: number;

  difficulty: Difficulty;

  ingredients: IngredientDTO[];

  instructions: string[];

  macrosPerServing: MacrosPerServingDTO;

  isPublished?: boolean;
}

export interface UpdateRecipeDTO
  extends Partial<CreateRecipeDTO> {}

export interface ReviewDTO {
  rating: number;
  comment?: string;
}

export interface RecipeFilters {
  category?: RecipeCategory;
  dietType?: DietType;
  difficulty?: Difficulty;

  search?: string;

  page?: number;
  limit?: number;
}