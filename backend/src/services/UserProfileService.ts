import { TOKENS } from "../container/tokens.js";
import type { UpdateUserProfileDTO, UserProfileResponseDTO } from "../dtos/userprofile.dto.js";
import { NotFoundError } from "../errors/index.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IUserProfileService } from "../interfaces/services/IUserProfileService.js";
import { injectable,inject } from "tsyringe";
import { UserProfileMapper } from "../mappers/UserProfileMappers.js";
import type { IUser } from "../models/User.js";
import type { IImageService } from "../interfaces/services/IImageService.js";
@injectable()
export class UserProfileService implements IUserProfileService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository:IUserRepository ,@inject(TOKENS.IImageService) private imageService:IImageService)
    {

    }
getProfile=async(userId: string): Promise<UserProfileResponseDTO> =>{
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not found")
    }
    return UserProfileMapper.toResponseDTO(user);

}

updateProfile=async(userId: string, data: UpdateUserProfileDTO): Promise<IUser | null> =>{
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not found");
    }
    const updated=UserProfileMapper.toUpdateEntity(user);
    const updatedUser=await this.userRepository.updateProfile(userId,updated);
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }
    return UserProfileMapper.toResponseDTO(updatedUser);
}

uploadAvatar=async(userId: string, file: Express.Multer.files): Promise<UserProfileResponseDTO> =>{
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User Not Found");
    }
    if(user.avatarPublicId)
    {
        await this.imageService.deleteImage(user.avatarPublicId)
    }

    const uploadedImage=await this.imageService.uploadImage(file);
    const updatedData=UserProfileMapper.toUpdateEntity({
        avatarPublicId:uploadedImage.publicId,
        avatarUrl:uploadedImage.url
    })
    const updatedUser=await this.userRepository.updateProfile(userId,updatedData);
    if(!updatedUser)
    {
        throw new NotFoundError("User Not Found")
    }
return UserProfileMapper.toResponseDTO(updatedUser);
}

deleteAvatar=async(userId: string): Promise<UserProfileResponseDTO> =>{
    const user=await this.userRepository.findById(userId);
    if(!user)
    {
        throw new NotFoundError("User not Found");
    }

    if(!user.avatarPublicId)
    {
        throw new NotFoundError("Avatar not Found");
    }
    await this.imageService.deleteImage(user.avatarPublicId);
    const updatedUser=await this.userRepository.updateProfile(userId,UserProfileMapper.toUpdateEntity({avatarUrl:undefined,avatarPublicId:undefined}))
     if (!updatedUser) {
        throw new NotFoundError("User not found");
    }

    
    return UserProfileMapper.toResponseDTO(updatedUser);
}
}