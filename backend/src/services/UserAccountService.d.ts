import type { IUserStatusService } from "../interfaces/services/IUserAccountService.js";
import type { ChangePassword, DeleteAccount } from "../dtos/userprofile.dto.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IImageService } from "../interfaces/services/IImageService.js";
export declare class UserAccountStatusService implements IUserStatusService {
    private userrepository;
    private imageService;
    constructor(userrepository: IUserRepository, imageService: IImageService);
    changePassword: (userId: string, data: ChangePassword) => Promise<void>;
    deleteAccount: (userId: string, data: DeleteAccount) => Promise<void>;
}
//# sourceMappingURL=UserAccountService.d.ts.map