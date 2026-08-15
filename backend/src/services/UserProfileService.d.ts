import type { UpdateUserProfileDTO, UserProfileResponseDTO } from "../dtos/userprofile.dto.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IUserProfileService } from "../interfaces/services/IUserProfileService.js";
import type { IUser } from "../models/User.js";
import type { IImageService } from "../interfaces/services/IImageService.js";
export declare class UserProfileService implements IUserProfileService {
    private userRepository;
    private imageService;
    constructor(userRepository: IUserRepository, imageService: IImageService);
    getProfile: (userId: string) => Promise<UserProfileResponseDTO>;
    updateProfile: (userId: string, data: UpdateUserProfileDTO) => Promise<IUser | null>;
    uploadAvatar: (userId: string, file: Express.Multer.files) => Promise<UserProfileResponseDTO>;
    deleteAvatar: (userId: string) => Promise<UserProfileResponseDTO>;
}
//# sourceMappingURL=UserProfileService.d.ts.map