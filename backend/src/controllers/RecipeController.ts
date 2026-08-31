import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { IRecipeService } from "../interfaces/services/IRecipeService.ts";
import type { Request, Response, NextFunction } from "express";

import { successResponse } from "../utils/response.ts";
import { HttpStatus } from "../constants/HttpStatus.ts";


@injectable()
export class RecipeController {

    constructor(
        @inject(TOKENS.IRecipeService)
        private readonly recipeService:IRecipeService
    ){}

    createRecipe = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const trainerId=req.user?.userId!;

            const result =
            await this.recipeService.createRecipe(
                trainerId,
                req.body,
                req.file as Express.Multer.File
            );

            successResponse(
                res,
                "Recipe created successfully",
                result,
                HttpStatus.CREATED
            );

        }catch(error){

            next(error);

        }

    }


    updateRecipe = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const trainerId=req.user?.userId!;

            const recipeId=req.params.id as string;

            const result =
            await this.recipeService.updateRecipe(
                trainerId,
                recipeId,
                req.body
            );

            successResponse(
                res,
                "Recipe updated successfully",
                result,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    deleteRecipe = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const trainerId=req.user?.userId!;

            await this.recipeService.deleteRecipe(
                trainerId,
                req.params.id as string
            );

            successResponse(
                res,
                "Recipe deleted successfully",
                null,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    getTrainerRecipes = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const trainerId=req.user?.userId!;

            const result =
            await this.recipeService.getTrainerRecipes(
                trainerId
            );

            successResponse(
                res,
                "Trainer recipes fetched",
                result,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    getPublishedRecipes = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const {
                page="1",
                limit="10",
                ...filters
            }=req.query;

            const result =
            await this.recipeService.getPublishedRecipes(
                filters,
                Number(page),
                Number(limit)
            );

            successResponse(
                res,
                "Recipes fetched",
                result,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    searchRecipes = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const {
                q,
                page="1",
                limit="10"
            }=req.query;

            const result =
            await this.recipeService.searchRecipes(
                q as string,
                Number(page),
                Number(limit)
            );

            successResponse(
                res,
                "Search results fetched",
                result,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    getRecipeById = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const result =
            await this.recipeService.getRecipeById(
                req.params.id as string
            );

            successResponse(
                res,
                "Recipe fetched",
                result,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    toggleFavorite = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const userId=req.user?.userId!;

            const result =
            await this.recipeService.toggleFavourite(
                userId,
                req.params.id as string
            );

            successResponse(
                res,
                "Favorite updated",
                result,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    getUserFavorites = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const userId=req.user?.userId!;

            const result =
            await this.recipeService.getUsersFavourite(
                userId
            );

            successResponse(
                res,
                "Favorites fetched",
                result,
                HttpStatus.OK
            );

        }catch(error){

            next(error);

        }

    }


    addReview = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{

        try{

            const userId=req.user?.userId!;

            const result =
            await this.recipeService.addReview(
                userId,
                req.params.id as string,
                req.body
            );

            successResponse(
                res,
                "Review added successfully",
                result,
                HttpStatus.CREATED
            );

        }catch(error){

            next(error);

        }

    }

}