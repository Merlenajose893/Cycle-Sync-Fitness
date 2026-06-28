import { type IRefreshToken } from "../models/RefreshToken.js";
import { BaseRepository } from "./BaseRepository.js";
import type { IRefreshTokenRepository } from "../interfaces/repositories/IRefreshTokenRepository.js";
export declare class RefreshTokenRepository extends BaseRepository<IRefreshToken> implements IRefreshTokenRepository {
    constructor();
    findByUserId(userId: string): Promise<IRefreshToken[] | null>;
    deleteByUserId(userId: string): Promise<void>;
    deleteByHash(tokenHash: string): Promise<void>;
}
//# sourceMappingURL=RefreshTokenRepository.d.ts.map