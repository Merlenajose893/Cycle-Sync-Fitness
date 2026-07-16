import type { Request,Response,NextFunction } from "express"
import { TOKENS } from "../container/tokens.js"
import { inject } from "tsyringe"
import type { IUserProfileService } from "../interfaces/services/IUserProfileService.js"
import { successResponse } from "../utils/response.js"
import { HttpStatus } from "../constants/HttpStatus.js"
export class UserProfileController{
    constructor(@inject(TOKENS.IUserProfileService) private userprofileservice:IUserProfileService)
    {

    }

    getProfile=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId!;
            const result=await this.userprofileservice.getProfile(userId);
            successResponse(res,"User profile is fetched",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }
    }

    updateProfile=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId;
            const result=await this.userprofileservice.updateProfile(userId,req.body);
            successResponse(res,"User profile is updated",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }
    }

    uploadAvatar=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId;
            const result=await this.userprofileservice.uploadAvatar(userId,req.file);
            successResponse(res,"Avatar is uploaded successfully",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }
    }

    deleteAvatar=async (req:Request,res:Response,next:NextFunction) => {
        try {
            const userId=req.user?.userId;
            const result=await this.userprofileservice.deleteAvatar(userId);
            successResponse(res,"Avatar deleted successfully",HttpStatus.OK,result);
        } catch (error) {
            next(error)
        }
    }
}