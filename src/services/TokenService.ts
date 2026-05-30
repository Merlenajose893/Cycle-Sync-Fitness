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
@injectable()
export class TokenService implements ITokenService{
    constructor(@inject(TOKENS.IRefreshTokenRepository)
private refreshTokenRepository:IRefreshTokenRepository
){}
async generateAndSetAccessToken(payload: TokenPayload, res: Response): string {
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
        userId:payload.userId,
        userType:payload.role,
        expiresAt:Date.now()+7*24*60*60*1000
    });

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true ,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    return refreshToken;
}

async verifyAccessToken(token: string): TokenPayload {
    try {
        return jwt.verify(token,process.env.JWT_SECRET as string) as TokenPayload:
        
    } catch  {
        throw new UnauthorizedError("Invalid access token");
    }
}

async verifyRefreshToken(token: string): TokenPayload {
    try {
        return jwt.verify(token,process.env.JWT_REFRESHTOKEN as string) as TokenPayload;
    } catch  {
        throw new UnauthorizedError("Invalid refresh token")
    }
}
async refreshTokens(refreshToken: string, res: Response): Promise<void> {
    const payload=this.verifyRefreshToken(refreshToken);
    console.log(payload);
    const storedTokens=await this.refreshTokenRepository.findByUserId(payload:userId)
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