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
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { injectable, inject } from "tsyringe";
import { UnauthorizedError } from "../errors/index.js";
import { TOKENS } from "../container/tokens.js";
import { IdTokenClient } from "google-auth-library";
import { Types } from "mongoose";
let TokenService = class TokenService {
    refreshTokenRepository;
    constructor(refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async generateAndSetAccessToken(payload, res) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
        console.log(accessToken);
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });
        return accessToken;
    }
    async generateAndSetRefreshToken(payload, res) {
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESHTOKEN, { expiresIn: "7d" });
        const tokenHash = await bcrypt.hash(refreshToken, 10);
        await this.refreshTokenRepository.create({
            tokenHash,
            userId: new Types.ObjectId(payload.userId),
            userType: payload.role,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return refreshToken;
    }
    async verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        catch {
            throw new UnauthorizedError("Invalid access token");
        }
    }
    async verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESHTOKEN);
        }
        catch {
            throw new UnauthorizedError("Invalid refresh token");
        }
    }
    async refreshTokens(refreshToken, res) {
        const payload = await this.verifyRefreshToken(refreshToken);
        console.log(payload);
        const storedTokens = await this.refreshTokenRepository.findByUserId(payload.userId);
        if (!storedTokens) {
            return;
        }
        let validTokenFound = false;
        for (const tokenDoc of storedTokens) {
            const isMatch = await bcrypt.compare(refreshToken, tokenDoc.tokenHash);
            if (isMatch) {
                validTokenFound = true;
                await this.refreshTokenRepository.deleteByHash(tokenDoc.tokenHash);
                break;
            }
        }
        if (!validTokenFound) {
            throw new UnauthorizedError("Refresh token not recognized");
        }
        const newPayload = {
            userId: payload.userId,
            role: payload.role
        };
        await this.generateAndSetAccessToken(newPayload, res);
        await this.generateAndSetRefreshToken(newPayload, res);
    }
    async clearTokens(userId, res) {
        if (userId) {
            await this.refreshTokenRepository.deleteByUserId(userId);
        }
        res.clearCookie("access_token");
        res.clearCookie("refreshToken");
    }
};
TokenService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IRefreshTokenRepository)),
    __metadata("design:paramtypes", [Object])
], TokenService);
export { TokenService };
//# sourceMappingURL=TokenService.js.map