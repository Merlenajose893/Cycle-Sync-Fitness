export type RecipeCategory =
    | "BREAKFAST"
    | "LUNCH"
    | "DINNER"
    | "SNACK"
    | "DESSERT"
    | "SMOOTHIE";

export type DietType =
    | "NO_RESTRICTION"
    | "VEGETARIAN"
    | "VEGAN"
    | "KETO"
    | "PALEO";

export type Difficulty =
    | "EASY"
    | "MEDIUM"
    | "HARD";

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface MacroPerServing {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface Review {
    userId: string;
    rating: number;
    comment?: string;
    createdAt: string;
}

export interface Recipe {
    _id?: string;
    trainerId?: string;

    title: string;
    description: string;
    imageUrl?: string;

    category: RecipeCategory;
    dietType: DietType;

    prepTime: number;
    cookTime: number;
    servings: number;

    difficulty: Difficulty;

    ingredients: Ingredient[];

    instructions: string[];

    macrosPerServing: MacroPerServing;

    favorites?: string[];

    reviews?: Review[];

    averageRating?: number;

    isPublished: boolean;

    createdAt?: string;
    updatedAt?: string;
}
export interface CreateRecipePayload {
    title: string;
    description: string;
    imageUrl?: string;

    category: RecipeCategory;
    dietType: DietType;

    prepTime: number;
    cookTime: number;
    servings: number;

    difficulty: Difficulty;

    ingredients: Ingredient[];

    instructions: string[];

    macrosPerServing: MacroPerServing;

    isPublished: boolean;
}
export type UpdateRecipePayload = Partial<CreateRecipePayload>;
export interface ReviewPayload {
    rating: number;
    comment?: string;
}
export interface RecipeFilters {
    category?: RecipeCategory;
    dietType?: DietType;
    difficulty?: Difficulty;
    search?: string;
}
export interface RecipeListResponse {
    data: Recipe[];

    meta: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}
export interface FavoriteResponse {
    favorited: boolean;
}