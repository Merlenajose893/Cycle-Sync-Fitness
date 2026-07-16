import { TOKENS } from "../container/tokens.js";
import type { UpdateUserProfileDTO, UserProfileResponseDTO } from "../dtos/userprofile.dto.js";
import { NotFoundError } from "../errors/index.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IUserProfileService } from "../interfaces/services/IUserProfileService.js";
import { injectable,inject } from "tsyringe";
import { UserProfileMapper } from "../mappers/UserProfileMappers.js";
import type { IUser } from "../models/User.js";
@injectable()
export class UserProfileService implements IUserProfileService{
    constructor(@inject(TOKENS.IUserRepository) private userRepository:IUserRepository)
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
}