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
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/index.js";
let RecipeService = class RecipeService {
    reciperepository;
    imageService;
    constructor(reciperepository, imageService) {
        this.reciperepository = reciperepository;
        this.imageService = imageService;
    }
    createRecipe = async (trainerId, data, file) => {
        let imageUrl = data.imageUrl;
        if (file) {
            const uploadImageResult = await this.imageService.uploadImage(file);
            imageUrl = uploadImageResult.url;
        }
        if (data.macrosPerServing) {
            const fatVal = data.macrosPerServing.fat ?? data.macrosPerServing.fats ?? 0;
            data.macrosPerServing.fat = fatVal;
            data.macrosPerServing.fats = fatVal;
        }
        const isPublished = data.isPublished !== undefined
            ? (String(data.isPublished) === 'true' || data.isPublished === true)
            : true;
        const recipe = await this.reciperepository.create({
            trainerId,
            ...data,
            imageUrl,
            isPublished,
            favorites: [],
            reviews: [],
            averageRating: 0
        });
        return recipe;
    };
    updateRecipe = async (trainerId, recipeId, data) => {
        const recipe = await this.reciperepository.findById(recipeId);
        if (!recipe) {
            throw new NotFoundError("Recipe not found");
        }
        if (recipe.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("Trainer is not authorised");
        }
        Object.assign(recipe, data);
        return await this.reciperepository.save(recipe);
    };
    deleteRecipe = async (trainerId, recipeId) => {
        const recipe = await this.reciperepository.findById(recipeId);
        if (!recipe) {
            throw new NotFoundError("Recipe not found");
        }
        if (recipe.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("Trainer is unauthorised");
        }
        return this.reciperepository.deleteById(recipeId);
    };
    getRecipeById = async (recipeId) => {
        const recipe = await this.reciperepository.findById(recipeId);
        if (!recipe) {
            throw new NotFoundError("Recipe Not Found");
        }
        return recipe;
    };
    searchRecipes = async (query, page, limit) => {
        const recipes = await this.reciperepository.searchByTitle(query, page, limit);
        const totalItems = await this.reciperepository.countPublished({ search: query });
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: recipes,
            meta: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        };
    };
    getTrainerRecipes = async (trainerId) => {
        const trainerRecipes = await this.reciperepository.findByTrainer(trainerId);
        return trainerRecipes;
    };
    toggleFavourite = async (userId, recipeId) => {
        const recipe = await this.reciperepository.findById(recipeId);
        if (!recipe) {
            throw new NotFoundError("Recipe Not Found");
        }
        const isFavourite = recipe.favorites.some((id) => id.toString() === userId);
        if (isFavourite) {
            recipe.favorites = recipe.favorites.filter((id) => id.toString() !== userId);
        }
        else {
            recipe.favorites.push(userId);
        }
        return await this.reciperepository.save(recipe);
    };
    getUsersFavourite = async (userId) => {
        const favouritesByUser = await this.reciperepository.findFavouritesByUser(userId);
        return favouritesByUser;
    };
    getPublishedRecipes = async (filters, page, limit) => {
        const recipes = await this.reciperepository.findPublished(filters, page, limit);
        const totalItems = await this.reciperepository.countPublished(filters);
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data: recipes,
            meta: {
                page,
                limit,
                totalPages,
                totalItems,
                hasNextPage: true,
                hasPreviousPage: true
            }
        };
    };
    addReview = async (userId, recipeId, data) => {
        const recipe = await this.reciperepository.findById(recipeId);
        if (!recipe) {
            throw new NotFoundError("Recipe not found");
        }
        const alreadyReviewed = recipe.reviews.some((id) => id.userId.toString() === userId);
        if (alreadyReviewed) {
            throw new BadRequestError("You already reviewed this recipe");
        }
        recipe.reviews.push({
            userId,
            rating: data.rating,
            comment: data.comment,
            createdAt: new Date()
        });
        recipe.averageRating = this.calculateAverageRating(recipe.reviews);
        return await this.reciperepository.save(recipe);
    };
    calculateAverageRating(reviews) {
        if (reviews.length === 0) {
            return 0;
        }
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return Number((total / reviews.length)
            .toFixed(1));
    }
};
RecipeService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IRecipeRepository)),
    __param(1, inject(TOKENS.IImageService)),
    __metadata("design:paramtypes", [Object, Object])
], RecipeService);
export { RecipeService };
//# sourceMappingURL=RecipeService.js.map