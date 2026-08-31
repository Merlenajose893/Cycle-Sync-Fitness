import type { UpdateUserProfileDTO, UserProfileResponseDTO } from "../../dtos/userprofile.dto.ts";
import type { IUser } from "../../models/User.ts";

export interface IUserProfileService{
    getProfile(userId:string):Promise<UserProfileResponseDTO>;
    updateProfile(userId:string,data:UpdateUserProfileDTO):Promise<UserProfileResponseDTO>;
    uploadAvatar(userId:string,file:Express.Multer.File):Promise<UserProfileResponseDTO>;
    deleteAvatar(userId:string):Promise<UserProfileResponseDTO>;
}