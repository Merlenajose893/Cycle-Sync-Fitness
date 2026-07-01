import type { IRefreshToken } from "../../models/RefreshToken.js";
export interface IRefreshTokenRepository {
    create(data: Partial<IRefreshToken>): Promise<IRefreshToken>;
    findByUserId(userId: string): Promise<IRefreshToken[] | null>;
    deleteByUserId(userId: string): Promise<void>;
    deleteByHash(tokenHash: string): Promise<void>;
}
//# sourceMappingURL=IRefreshTokenRepository.d.ts.map