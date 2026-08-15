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
import { TOKENS } from "../container/tokens.js";
import { inject, injectable } from "tsyringe";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
let UserProfileController = class UserProfileController {
    userprofileservice;
    constructor(userprofileservice) {
        this.userprofileservice = userprofileservice;
    }
    getProfile = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.userprofileservice.getProfile(userId);
            successResponse(res, "User profile is fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    updateProfile = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.userprofileservice.updateProfile(userId, req.body);
            successResponse(res, "User profile is updated", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    uploadAvatar = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.userprofileservice.uploadAvatar(userId, req.file);
            successResponse(res, "Avatar is uploaded successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    deleteAvatar = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.userprofileservice.deleteAvatar(userId);
            successResponse(res, "Avatar deleted successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
UserProfileController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserProfileService)),
    __metadata("design:paramtypes", [Object])
], UserProfileController);
export { UserProfileController };
//# sourceMappingURL=UserProfileController.js.map