import type { Response } from "express";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { TokenPayload } from "../types/auth.types.js";
import type { IRefreshTokenRepository } from "../interfaces/repositories/IRefreshTokenRepository.js";
export declare class TokenService implements ITokenService {
    private refreshTokenRepository;
    constructor(refreshTokenRepository: IRefreshTokenRepository);
    generateAndSetAccessToken(payload: TokenPayload, res: Response): Promise<string>;
    generateAndSetRefreshToken(payload: TokenPayload, res: Response): Promise<string>;
    verifyAccessToken(token: string): Promise<TokenPayload>;
    verifyRefreshToken(token: string): Promise<TokenPayload>;
    refreshTokens(refreshToken: string, res: Response): Promise<void>;
    clearTokens(userId: string, res: Response): Promise<void>;
}
//# sourceMappingURL=TokenService.d.ts.map