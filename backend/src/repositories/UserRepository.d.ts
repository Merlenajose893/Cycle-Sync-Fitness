import type { IUser } from "../models/User.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor();
    findByEmail(email: string): Promise<IUser | null>;
    findByGoogleId(googleId: string): Promise<IUser | null>;
    blockUser(userId: string): Promise<IUser | null>;
    unblockUser(userId: string): Promise<IUser | null>;
    updateProfile(userId: string, data: Partial<IUser>): Promise<IUser | null>;
    softDelete(userId: string): Promise<IUser | null>;
    hardDelete(userId: string): Promise<IUser | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map