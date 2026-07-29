import { useState, useCallback } from "react";
import axios from "axios";

import { recipeService } from "../../services/recipes/recipeService";

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
            page:number = 1,
            limit:number = 10
        ):Promise<RecipeListResponse | undefined> => {


        try {

            setLoading(true);
            setError(null);


            const data =
                await recipeService.getRecipes(
                    filters,
                    page,
                    limit
                );


            setRecipes(data.data);


            return data;


        } catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to fetch recipes"
                );

            }else{

                setError(
                    "Unexpected error occurred while fetching recipes"
                );

            }

        } finally {

            setLoading(false);

        }


    },[]);




    const searchRecipes = useCallback(
        async(
            query:string,
            page:number = 1,
            limit:number = 10
        ):Promise<RecipeListResponse | undefined> => {


        try {

            setLoading(true);
            setError(null);


            const data =
                await recipeService.searchRecipes(
                    query,
                    page,
                    limit
                );


            setRecipes(data.data);


            return data;


        }catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to search recipes"
                );

            }else{

                setError(
                    "Unexpected error occurred while searching recipes"
                );

            }

        }finally{

            setLoading(false);

        }


    },[]);




    const fetchRecipeById = useCallback(
        async(
            id:string
        ):Promise<Recipe | undefined>=>{


        try{

            setLoading(true);
            setError(null);


            const data =
                await recipeService.getRecipeById(
                    id
                );


            setRecipe(data);


            return data;


        }catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to fetch recipe"
                );

            }else{

                setError(
                    "Unexpected error occurred while fetching recipe"
                );

            }

        }finally{

            setLoading(false);

        }


    },[]);





    const createRecipe = useCallback(
        async(
            payload:CreateRecipePayload
        ):Promise<boolean>=>{


        try{

            setLoading(true);
            setError(null);


            await recipeService.createRecipe(
                payload
            );


            return true;


        }catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to create recipe"
                );

            }else{

                setError(
                    "Unexpected error occurred while creating recipe"
                );

            }


            return false;


        }finally{

            setLoading(false);

        }


    },[]);





    const updateRecipe = useCallback(
        async(
            id:string,
            payload:UpdateRecipePayload
        ):Promise<boolean>=>{


        try{

            setLoading(true);
            setError(null);


            await recipeService.updateRecipe(
                id,
                payload
            );


            return true;


        }catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to update recipe"
                );

            }else{

                setError(
                    "Unexpected error occurred while updating recipe"
                );

            }


            return false;


        }finally{

            setLoading(false);

        }


    },[]);





    const deleteRecipe = useCallback(
        async(
            id:string
        ):Promise<boolean>=>{


        try{

            setLoading(true);
            setError(null);


            await recipeService.deleteRecipe(
                id
            );


            return true;


        }catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to delete recipe"
                );

            }else{

                setError(
                    "Unexpected error occurred while deleting recipe"
                );

            }


            return false;


        }finally{

            setLoading(false);

        }


    },[]);





    const toggleFavorite = useCallback(
        async(
            id:string
        ):Promise<boolean>=>{


        try{

            setLoading(true);
            setError(null);


            await recipeService.toggleFavorite(
                id
            );


            return true;


        }catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to update favorite"
                );

            }else{

                setError(
                    "Unexpected error occurred while updating favorite"
                );

            }


            return false;


        }finally{

            setLoading(false);

        }


    },[]);





    const addReview = useCallback(
        async(
            id:string,
            payload:ReviewPayload
        ):Promise<boolean>=>{


        try{

            setLoading(true);
            setError(null);


            await recipeService.addReview(
                id,
                payload
            );


            return true;


        }catch(err:unknown){


            if(axios.isAxiosError(err)){

                setError(
                    err.response?.data.message ||
                    "Failed to add review"
                );

            }else{

                setError(
                    "Unexpected error occurred while adding review"
                );

            }


            return false;


        }finally{

            setLoading(false);

        }


    },[]);




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