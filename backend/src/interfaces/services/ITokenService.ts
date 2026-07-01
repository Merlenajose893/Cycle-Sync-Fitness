import type { Response } from "express";
import type { TokenPayload } from "../../types/auth.types.js";

export interface ITokenService{
    generateAndSetAccessToken(payload:TokenPayload,res:Response):Promise<string>;
    generateAndSetRefreshToken(payload:TokenPayload,res:Response):Promise<string>;
    verifyAccessToken(token:string):Promise<TokenPayload>;
    verifyRefreshToken(token:string):Promise<TokenPayload>;
    refreshTokens(refreshToken:string,res:Response):Promise<void>;
    clearTokens(userId:string,res:Response):Promise<void>
}