import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { Response } from "express";
import { injectable,inject } from "tsyringe";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { TokenPayload } from "../types/auth.types.js";
import type { IRefreshTokenRepository } from "../interfaces/repositories/IRefreshTokenRepository.js";
import { UnauthorizedError } from "../errors/index.js";
import { TOKENS } from "../container/tokens.js";
import { IdTokenClient } from "google-auth-library";
<<<<<<< HEAD
import { Types } from "mongoose";
=======
>>>>>>> 081b12d (changes)
@injectable()
export class TokenService implements ITokenService{
    constructor(@inject(TOKENS.IRefreshTokenRepository)
private refreshTokenRepository:IRefreshTokenRepository
){}
<<<<<<< HEAD
async generateAndSetAccessToken(payload: TokenPayload, res: Response): Promise<string> {
=======
async generateAndSetAccessToken(payload: TokenPayload, res: Response): string {
>>>>>>> 081b12d (changes)
    const acessToken=jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"15m"})
    res.cookie("access_token",acessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:15*60*1000
    })
    return acessToken;
}

async generateAndSetRefreshToken(payload: TokenPayload, res: Response): Promise<string> {
    const refreshToken=jwt.sign(payload,process.env.JWT_REFRESHTOKEN as string,{expiresIn:"7d"})
    const tokenHash=await bcrypt.hash(refreshToken,10);
    await this.refreshTokenRepository.create({
        tokenHash,
<<<<<<< HEAD
        userId:new Types.ObjectId(payload.userId),
        userType:payload.role,
        expiresAt:new Date(Date.now()+7*24*60*60*1000)
=======
        userId:payload.userId,
        userType:payload.role,
        expiresAt:Date.now()+7*24*60*60*1000
>>>>>>> 081b12d (changes)
    });

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true ,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    return refreshToken;
}

<<<<<<< HEAD
async verifyAccessToken(token: string): Promise<TokenPayload> {
=======
async verifyAccessToken(token: string): TokenPayload {
>>>>>>> 081b12d (changes)
    try {
        return jwt.verify(token,process.env.JWT_SECRET as string) as TokenPayload;
        
    } catch  {
        throw new UnauthorizedError("Invalid access token");
    }
}

<<<<<<< HEAD
async verifyRefreshToken(token: string): Promise<TokenPayload> {
=======
async verifyRefreshToken(token: string): TokenPayload {
>>>>>>> 081b12d (changes)
    try {
        return jwt.verify(token,process.env.JWT_REFRESHTOKEN as string) as TokenPayload;
    } catch  {
        throw new UnauthorizedError("Invalid refresh token")
    }
}
async refreshTokens(refreshToken: string, res: Response): Promise<void> {
<<<<<<< HEAD
    const payload=await this.verifyRefreshToken(refreshToken);
    console.log(payload);
    const storedTokens=await this.refreshTokenRepository.findByUserId(payload.userId)
    if(!storedTokens)
    {
        return;
    }
=======
    const payload=this.verifyRefreshToken(refreshToken);
    console.log(payload);
    const storedTokens=await this.refreshTokenRepository.findByUserId(payload.userId)
>>>>>>> 081b12d (changes)
    let validTokenFound=false;
    for(const tokenDoc of storedTokens)
    {
        const isMatch=await bcrypt.compare(refreshToken,tokenDoc.tokenHash)
        if(isMatch)
        {
            validTokenFound=true;
            await this.refreshTokenRepository.deleteByHash(tokenDoc.tokenHash);
            break;
        }
    }

    if(!validTokenFound)
    {
        throw new UnauthorizedError("Refresh token not recognized");
    }

    await this.generateAndSetAccessToken(payload,res)
    await this.generateAndSetRefreshToken(payload,res)
    
}

async clearTokens(userId: string, res: Response): Promise<void> {
    await this.refreshTokenRepository.deleteByUserId(userId);
    res.clearCookie("acess_token")
}


}