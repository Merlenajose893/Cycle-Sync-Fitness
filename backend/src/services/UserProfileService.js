var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { TOKENS } from "../container/tokens.js";
import { NotFoundError } from "../errors/index.js";
import { injectable, inject } from "tsyringe";
import { UserProfileMapper } from "../mappers/UserProfileMappers.js";
let UserProfileService = class UserProfileService {
    userRepository;
    imageService;
    constructor(userRepository, imageService) {
        this.userRepository = userRepository;
        this.imageService = imageService;
    }
    getProfile = async (userId) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return UserProfileMapper.toResponseDTO(user);
    };
    updateProfile = async (userId, data) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        const updated = UserProfileMapper.toUpdateEntity(user);
        const updatedUser = await this.userRepository.updateProfile(userId, updated);
        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }
        return UserProfileMapper.toResponseDTO(updatedUser);
    };
    uploadAvatar = async (userId, file) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User Not Found");
        }
        if (user.avatarPublicId) {
            await this.imageService.deleteImage(user.avatarPublicId);
        }
        const uploadedImage = await this.imageService.uploadImage(file);
        const updatedData = UserProfileMapper.toUpdateEntity({
            avatarPublicId: uploadedImage.publicId,
            avatarUrl: uploadedImage.url
        });
        const updatedUser = await this.userRepository.updateProfile(userId, updatedData);
        if (!updatedUser) {
            throw new NotFoundError("User Not Found");
        }
        return UserProfileMapper.toResponseDTO(updatedUser);
    };
    deleteAvatar = async (userId) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User not Found");
        }
        if (!user.avatarPublicId) {
            throw new NotFoundError("Avatar not Found");
        }
        await this.imageService.deleteImage(user.avatarPublicId);
        const updatedUser = await this.userRepository.updateProfile(userId, UserProfileMapper.toUpdateEntity({ avatarUrl: undefined, avatarPublicId: undefined }));
        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }
        return UserProfileMapper.toResponseDTO(updatedUser);
    };
};
UserProfileService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IUserRepository)),
    __param(1, inject(TOKENS.IImageService)),
    __metadata("design:paramtypes", [Object, Object])
], UserProfileService);
export { UserProfileService };
//# sourceMappingURL=UserProfileService.js.map