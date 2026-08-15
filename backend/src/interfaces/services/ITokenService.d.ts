import type { Response } from "express";
import type { TokenPayload } from "../../types/auth.types.js";
export interface ITokenService {
    generateAndSetAccessToken(payload: TokenPayload, res: Response): Promise<string>;
    verifyAccessToken(token: string): Promise<TokenPayload>;
    verifyRefreshToken(token: string): Promise<TokenPayload>;
    generateAndSetRefreshToken(payload: TokenPayload, res: Response): Promise<string>;
    refreshTokens(refreshToken: string, res: Response): Promise<void>;
    clearTokens(userId: string, res: Response): Promise<void>;
}
//# sourceMappingURL=ITokenService.d.ts.map