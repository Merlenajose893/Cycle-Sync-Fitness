import type { UpdateUserProfileDTO, UserProfileResponseDTO } from "../../dtos/userprofile.dto.js";
import type { IUser } from "../../models/User.js";

export interface IUserProfileService{
    getProfile(userId:string):Promise<UserProfileResponseDTO>;
    updateProfile(userId:string,data:UpdateUserProfileDTO):Promise<UserProfileResponseDTO>;
    uploadAvatar(userId:string,file:Express.Multer.File):Promise<UserProfileResponseDTO>;
    deleteAvatar(userId:string):Promise<UserProfileResponseDTO>;
}