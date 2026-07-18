import type { IUserStatusService } from "../interfaces/services/IUserAccountService.js";
import { TOKENS } from "../container/tokens.js";
import type { ChangePassword, DeleteAccount } from "../dtos/userprofile.dto.js";
import { inject } from "tsyringe";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import bcrypt from "bcryptjs";
import type { IImageService } from "../interfaces/services/IImageService.js";
export class UserAccountStatusService implements IUserStatusService{
    constructor(@inject(TOKENS.IUserRepository) private userrepository:IUserRepository ,@inject(TOKENS.IImageService) private imageService:IImageService)
    {

    }
    changePassword=async(userId: string, data: ChangePassword): Promise<void> =>{
        const user=await this.userrepository.findById(userId);
        if(!user)
        {
            throw new NotFoundError("User not found");
        }
        if(!user.password)
        {
            throw new BadRequestError("Password is not there")
        }
        const isCompare=await bcrypt.compare(data.currentPassword,user.password);
        if(!isCompare)
        {
            throw new BadRequestError("Passwords doesnt match ")
        }

        const hashedPassword=await bcrypt.hash(data.newPassword,10);
        user.password=hashedPassword;
        await this.userrepository.save(user);

    }
    deleteAccount=async(userId: string, data: DeleteAccount): Promise<void>=> {
        const user=await this.userrepository.findById(userId);
        if(!user)
        {
            throw new NotFoundError("User not found");
        }
        if(!user.password)
        {
            throw new BadRequestError("Google Accounts cannot be deleted without password")
        }
        const isPasswordValid=await bcrypt.compare(data.password,user.password);
        if(!isPasswordValid)
        {
            throw new BadRequestError("password doesnt match ");
        }
        if(user.avatarPublicId)
        {
            await this.imageService.deleteImage(user.avatarPublicId);
        }
        await this.userrepository.softDelete(userId);
    }
}

