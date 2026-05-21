import type { Response } from "express";
import type { TokenPayload } from "../../dtos/auth.types.js";

export interface ITokenService{
    generateAndSetAccessToken(payload:TokenPayload,res:Response):string;
    generateAndSetRefreshToken(payload:TokenPayload,res:Response):Promise<string>;
    verifyAccessToken(token:string):TokenPayload;
    verifyRefreshToken(token:string):TokenPayload;
    refreshTokens(refreshToken:string,res:Response):Promise<void>;
    clearTokens(userId:string,res:Response):Promise<void>
}