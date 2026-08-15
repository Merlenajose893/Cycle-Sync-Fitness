import type { IUser } from "../../models/User.js";
import type { IBaseRepository } from "./IBaseRepository.js";
export interface IUserRepository extends IBaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    findByGoogleId(googleId: string): Promise<IUser | null>;
    blockUser(userId: string): Promise<IUser | null>;
    unblockUser(userId: string): Promise<IUser | null>;
    updateProfile(userId: string, data: Partial<IUser>): Promise<IUser | null>;
    softDelete(userId: string): Promise<IUser | null>;
    hardDelete(userId: string): Promise<IUser | null>;
}
//# sourceMappingURL=IUserRepository.d.ts.map