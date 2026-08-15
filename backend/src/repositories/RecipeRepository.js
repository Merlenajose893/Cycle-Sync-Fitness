var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "tsyringe";
import { RecipeModel } from "../models/Recpe.js";
import { BaseRepository } from "./BaseRepository.js";
let RecipeRepository = class RecipeRepository extends BaseRepository {
    constructor() {
        super(RecipeModel);
    }
    async findByTrainer(trainerId) {
        return this.model.find({ trainerId }).sort({ createdAt: -1 });
    }
    async findFavouritesByUser(userId) {
        return this.model.find({ favorites: userId });
    }
    async findPublished(filters, page, limit) {
        const skip = (page - 1) * limit;
        const query = {
            isPublished: { $ne: false }
        };
        if (filters.category) {
            query.category = filters.category;
        }
        if (filters.dietType) {
            query.dietType = filters.dietType;
        }
        if (filters.difficulty) {
            query.difficulty = filters.difficulty;
        }
        return this.model.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    }
    async countPublished(filters) {
        const query = {
            isPublished: { $ne: false }
        };
        if (filters.category) {
            query.category = filters.category;
        }
        if (filters.dietType) {
            query.dietType = filters.dietType;
        }
        if (filters.difficulty) {
            query.difficulty = filters.difficulty;
        }
        return this.model.countDocuments(query);
    }
    async searchByTitle(query, page, limit) {
        let skip = (page - 1) * limit;
        return this.model.find({
            title: { $regex: query, $options: "i" },
            isPublished: { $ne: false }
        }).skip(skip).limit(limit).sort({ createdAt: -1 });
    }
    async addFavourites(recipeId, userId) {
        return this.model.findByIdAndUpdate(recipeId, { $addToSet: { favorites: userId } }, { new: true });
    }
    async removeFavourites(recipeId, userId) {
        return this.model.findByIdAndUpdate(recipeId, { $pull: { favorites: userId } }, { new: true });
    }
};
RecipeRepository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], RecipeRepository);
export { RecipeRepository };
//# sourceMappingURL=RecipeRepository.js.map