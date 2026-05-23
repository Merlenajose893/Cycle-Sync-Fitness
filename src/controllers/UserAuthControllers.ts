import type { Request,Response,NextFunction } from "express";
import { inject,injectable } from "tsyringe";
import type { IUserAuthService } from "../interfaces/services/IUserAuthService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
@injectable()

export class UserAuthController{
    constructor(@inject(TOKENS.UserAuthService) private userAuthService:IUserAuthService){}
    registerUser=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        const result=await this.userAuthService.registerUser(req.body);
        successResponse(res,"OTP sent successfully",result,HttpStatus.CREATED)
    }

    verifyUserOtp=async(req:Request,res:Response):Promise<void>=>{
        const result=await this.userAuthService.verifyEmailOTP(req.body);
        successResponse(res,"Email verified successfully",result,HttpStatus.OK)

        
    }

    loginUser=async (req:Request,res:Response):Promise<void> => {
        
    }
}