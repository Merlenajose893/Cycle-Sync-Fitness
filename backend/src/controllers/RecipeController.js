var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
let RecipeController = class RecipeController {
    recipeService;
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    createRecipe = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const result = await this.recipeService.createRecipe(trainerId, req.body, req.file);
            successResponse(res, "Recipe created successfully", result, HttpStatus.CREATED);
        }
        catch (error) {
            next(error);
        }
    };
    updateRecipe = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const recipeId = req.params.id;
            const result = await this.recipeService.updateRecipe(trainerId, recipeId, req.body);
            successResponse(res, "Recipe updated successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    deleteRecipe = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            await this.recipeService.deleteRecipe(trainerId, req.params.id);
            successResponse(res, "Recipe deleted successfully", null, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getTrainerRecipes = async (req, res, next) => {
        try {
            const trainerId = req.user?.userId;
            const result = await this.recipeService.getTrainerRecipes(trainerId);
            successResponse(res, "Trainer recipes fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getPublishedRecipes = async (req, res, next) => {
        try {
            const { page = "1", limit = "10", ...filters } = req.query;
            const result = await this.recipeService.getPublishedRecipes(filters, Number(page), Number(limit));
            successResponse(res, "Recipes fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    searchRecipes = async (req, res, next) => {
        try {
            const { q, page = "1", limit = "10" } = req.query;
            const result = await this.recipeService.searchRecipes(q, Number(page), Number(limit));
            successResponse(res, "Search results fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getRecipeById = async (req, res, next) => {
        try {
            const result = await this.recipeService.getRecipeById(req.params.id);
            successResponse(res, "Recipe fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    toggleFavorite = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.recipeService.toggleFavourite(userId, req.params.id);
            successResponse(res, "Favorite updated", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getUserFavorites = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.recipeService.getUsersFavorites(userId);
            successResponse(res, "Favorites fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    addReview = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.recipeService.addReview(userId, req.params.id, req.body);
            successResponse(res, "Review added successfully", result, HttpStatus.CREATED);
        }
        catch (error) {
            next(error);
        }
    };
};
RecipeController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IRecipeService)),
    __metadata("design:paramtypes", [Object])
], RecipeController);
export { RecipeController };
//# sourceMappingURL=RecipeController.js.map