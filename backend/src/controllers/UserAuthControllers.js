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
import { UnauthorizedError } from "../errors/index.js";
let UserAuthController = class UserAuthController {
    userAuthService;
    constructor(userAuthService) {
        this.userAuthService = userAuthService;
    }
    registerUser = async (req, res, next) => {
        const result = await this.userAuthService.registerUser(req.body, res);
        successResponse(res, "OTP sent successfully", result, HttpStatus.CREATED);
    };
    verifyUserOtp = async (req, res) => {
        const result = await this.userAuthService.verifyEmailOTP(req.body, res);
        successResponse(res, "Email verified successfully", result, HttpStatus.OK);
    };
    loginUser = async (req, res) => {
        await this.userAuthService.loginUser(req.body, res);
        successResponse(res, "Login Successfull", null, HttpStatus.OK);
    };
    resendOtp = async (req, res) => {
        await this.userAuthService.resendOTP(req.body, res);
        successResponse(res, "Otp resend Successfully", null, HttpStatus.OK);
    };
    logoutUser = async (req, res) => {
        const userId = req.user?.userId;
        if (!userId) {
            throw new UnauthorizedError("User ID is missing");
        }
        await this.userAuthService
            .logoutuser({ userId }, res);
        successResponse(res, "Logout successful", null, HttpStatus.OK);
    };
    refreshToken = async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        await this.userAuthService.refreshToken(refreshToken, res);
        successResponse(res, "Token refreshed", null, HttpStatus.OK);
    };
};
UserAuthController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserAuthService)),
    __metadata("design:paramtypes", [Object])
], UserAuthController);
export { UserAuthController };
//# sourceMappingURL=UserAuthControllers.js.map