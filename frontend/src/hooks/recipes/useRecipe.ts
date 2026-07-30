import { useState, useCallback } from "react";
import axios from "axios";

import { recipeService } from "../../services/recipes/recipeService";
import { RECIPE_MESSAGES } from "../../constants/messages";

import type {
    Recipe,
    RecipeFilters,
    CreateRecipePayload,
    UpdateRecipePayload,
    ReviewPayload,
    RecipeListResponse
} from "../../types/recipe.types";


export const useRecipe = () => {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [recipes, setRecipes] =
        useState<Recipe[]>([]);

    const [recipe, setRecipe] =
        useState<Recipe | null>(null);


    const fetchRecipes = useCallback(
        async (
            filters: RecipeFilters,
            page: number = 1,
            limit: number = 10
        ): Promise<RecipeListResponse | undefined> => {

            try {
                setLoading(true);
                setError(null);

                const data =
                    await recipeService.getRecipes(
                        filters,
                        page,
                        limit
                    );

                const recipeArray = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                    ? data.data
                    : Array.isArray(data?.data?.recipes)
                    ? data.data.recipes
                    : [];

                setRecipes(recipeArray);

                return data;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.FETCH_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.FETCH_UNEXPECTED
                    );
                }

            } finally {
                setLoading(false);
            }

        }, []);


    const searchRecipes = useCallback(
        async (
            query: string,
            page: number = 1,
            limit: number = 10
        ): Promise<RecipeListResponse | undefined> => {

            try {
                setLoading(true);
                setError(null);

                const data =
                    await recipeService.searchRecipes(
                        query,
                        page,
                        limit
                    );

                const recipeArray = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                    ? data.data
                    : Array.isArray(data?.data?.recipes)
                    ? data.data.recipes
                    : [];

                setRecipes(recipeArray);

                return data;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.SEARCH_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.SEARCH_UNEXPECTED
                    );
                }

            } finally {
                setLoading(false);
            }

        }, []);


    const fetchRecipeById = useCallback(
        async (
            id: string
        ): Promise<Recipe | undefined> => {

            try {
                setLoading(true);
                setError(null);

                const data =
                    await recipeService.getRecipeById(
                        id
                    );

                setRecipe(data);

                return data;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.FETCH_BY_ID_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.FETCH_BY_ID_UNEXPECTED
                    );
                }

            } finally {
                setLoading(false);
            }

        }, []);


    const createRecipe = useCallback(
        async (
            payload: CreateRecipePayload | FormData,
            imageFile?: File | null
        ): Promise<boolean> => {

            try {
                setLoading(true);
                setError(null);

                let requestData: CreateRecipePayload | FormData = payload;

                if (imageFile) {
                    const formData = new FormData();
                    formData.append("image", imageFile);

                    // Append all payload fields to FormData
                    if (payload instanceof FormData) {
                        requestData = payload;
                    } else {
                        Object.entries(payload).forEach(([key, value]) => {
                            if (typeof value === "object") {
                                formData.append(key, JSON.stringify(value));
                            } else {
                                formData.append(key, String(value));
                            }
                        });
                        requestData = formData;
                    }
                }

                await recipeService.createRecipe(requestData);

                return true;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.CREATE_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.CREATE_UNEXPECTED
                    );
                }

                return false;

            } finally {
                setLoading(false);
            }

        }, []);


    const updateRecipe = useCallback(
        async (
            id: string,
            payload: UpdateRecipePayload | FormData,
            imageFile?: File | null
        ): Promise<boolean> => {

            try {
                setLoading(true);
                setError(null);

                let requestData: UpdateRecipePayload | FormData = payload;

                if (imageFile) {
                    const formData = new FormData();
                    formData.append("image", imageFile);

                    if (payload instanceof FormData) {
                        requestData = payload;
                    } else {
                        Object.entries(payload).forEach(([key, value]) => {
                            if (value !== undefined) {
                                if (typeof value === "object") {
                                    formData.append(key, JSON.stringify(value));
                                } else {
                                    formData.append(key, String(value));
                                }
                            }
                        });
                        requestData = formData;
                    }
                }

                await recipeService.updateRecipe(
                    id,
                    requestData
                );

                return true;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.UPDATE_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.UPDATE_UNEXPECTED
                    );
                }

                return false;

            } finally {
                setLoading(false);
            }

        }, []);


    const deleteRecipe = useCallback(
        async (
            id: string
        ): Promise<boolean> => {

            try {
                setLoading(true);
                setError(null);

                await recipeService.deleteRecipe(
                    id
                );

                return true;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.DELETE_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.DELETE_UNEXPECTED
                    );
                }

                return false;

            } finally {
                setLoading(false);
            }

        }, []);


    const toggleFavorite = useCallback(
        async (
            id: string
        ): Promise<boolean> => {

            try {
                setLoading(true);
                setError(null);

                await recipeService.toggleFavorite(
                    id
                );

                return true;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.FAVORITE_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.FAVORITE_UNEXPECTED
                    );
                }

                return false;

            } finally {
                setLoading(false);
            }

        }, []);


    const addReview = useCallback(
        async (
            id: string,
            payload: ReviewPayload
        ): Promise<boolean> => {

            try {
                setLoading(true);
                setError(null);

                await recipeService.addReview(
                    id,
                    payload
                );

                return true;

            } catch (err: unknown) {

                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data.message ||
                        RECIPE_MESSAGES.REVIEW_FAILED
                    );
                } else {
                    setError(
                        RECIPE_MESSAGES.REVIEW_UNEXPECTED
                    );
                }

                return false;

            } finally {
                setLoading(false);
            }

        }, []);


    return {
        loading,
        error,
        recipes,
        recipe,
        fetchRecipes,
        searchRecipes,
        fetchRecipeById,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
        addReview
    };

};