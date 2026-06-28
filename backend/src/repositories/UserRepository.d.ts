import type { IUser } from "../models/User.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor();
    findByEmail(email: string): Promise<IUser | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map