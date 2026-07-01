import type { Response } from "express";
import type { TokenPayload } from "../../types/auth.types.js";

export interface ITokenService{
<<<<<<< HEAD
    generateAndSetAccessToken(payload:TokenPayload,res:Response):Promise<string>;
    generateAndSetRefreshToken(payload:TokenPayload,res:Response):Promise<string>;
    verifyAccessToken(token:string):Promise<TokenPayload>;
    verifyRefreshToken(token:string):Promise<TokenPayload>;
=======
    generateAndSetAccessToken(payload:TokenPayload,res:Response):string;
    generateAndSetRefreshToken(payload:TokenPayload,res:Response):Promise<string>;
    verifyAccessToken(token:string):TokenPayload;
    verifyRefreshToken(token:string):TokenPayload;
>>>>>>> 081b12d (changes)
    refreshTokens(refreshToken:string,res:Response):Promise<void>;
    clearTokens(userId:string,res:Response):Promise<void>
}