import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

import type {
    CreateRecipePayload,
    UpdateRecipePayload,
    FavoriteResponse,
    Recipe,
    RecipeFilters,
    RecipeListResponse,
    ReviewPayload
} from "../../types/recipe.types";


export const recipeService = {

    async createRecipe(
        data: CreateRecipePayload | FormData
    ): Promise<Recipe> {

        const isFormData = data instanceof FormData;

        const response =
            await axiosInstance.post(
                API_ENDPOINTS.RECIPES.BASE,
                data,
                isFormData
                    ? { headers: { "Content-Type": "multipart/form-data" } }
                    : undefined
            );

        return response.data;
    },


    async updateRecipe(
        recipeId: string,
        data: UpdateRecipePayload | FormData
    ): Promise<Recipe> {

        const isFormData = data instanceof FormData;

        const response =
            await axiosInstance.put(
                API_ENDPOINTS.RECIPES.BY_ID(recipeId),
                data,
                isFormData
                    ? { headers: { "Content-Type": "multipart/form-data" } }
                    : undefined
            );

        return response.data;
    },


    async deleteRecipe(
        recipeId: string
    ): Promise<void> {

        await axiosInstance.delete(
            API_ENDPOINTS.RECIPES.BY_ID(recipeId)
        );

    },


    async getMyRecipes(): Promise<Recipe[]> {

        const response =
            await axiosInstance.get(
                API_ENDPOINTS.RECIPES.MINE
            );

        return response.data;
    },


    async getRecipes(
        filters: RecipeFilters,
        page: number = 1,
        limit: number = 10
    ): Promise<RecipeListResponse> {

        const response =
            await axiosInstance.get(
                API_ENDPOINTS.RECIPES.BASE,
                {
                    params: {
                        ...filters,
                        page,
                        limit
                    }
                }
            );

        return response.data;
    },


    async searchRecipes(
        query: string,
        page: number = 1,
        limit: number = 10
    ): Promise<RecipeListResponse> {

        const response =
            await axiosInstance.get(
                API_ENDPOINTS.RECIPES.SEARCH,
                {
                    params: {
                        q: query,
                        page,
                        limit
                    }
                }
            );

        return response.data;
    },


    async getRecipeById(
        recipeId: string
    ): Promise<Recipe> {

        const response =
            await axiosInstance.get(
                API_ENDPOINTS.RECIPES.BY_ID(recipeId)
            );

        return response.data;
    },


    async getFavorites(): Promise<Recipe[]> {

        const response =
            await axiosInstance.get(
                API_ENDPOINTS.RECIPES.FAVORITES
            );

        return response.data;
    },


    async toggleFavorite(
        recipeId: string
    ): Promise<FavoriteResponse> {

        const response =
            await axiosInstance.post(
                API_ENDPOINTS.RECIPES.FAVORITE(recipeId)
            );

        return response.data;
    },


    async addReview(
        recipeId: string,
        data: ReviewPayload
    ): Promise<Recipe> {

        const response =
            await axiosInstance.post(
                API_ENDPOINTS.RECIPES.REVIEW(recipeId),
                data
            );

        return response.data;
    }

};