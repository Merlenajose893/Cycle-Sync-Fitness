import type { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import type { IUserAuthService } from "../interfaces/services/IUserAuthService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import { UnauthorizedError } from "../errors/index.js";
@injectable()

export class UserAuthController {
    constructor(@inject(TOKENS.IUserAuthService) private userAuthService: IUserAuthService) { }
    registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const result = await this.userAuthService.registerUser(req.body,res);
        successResponse(res, "OTP sent successfully", result, HttpStatus.CREATED)
    }

    verifyUserOtp = async (req: Request, res: Response): Promise<void> => {
        const result = await this.userAuthService.verifyEmailOTP(req.body,res);
        successResponse(res, "Email verified successfully", result, HttpStatus.OK)


    }

    loginUser = async (req: Request, res: Response): Promise<void> => {
        await this.userAuthService.loginUser(req.body, res);
        successResponse(res, "Login Successfull", null, HttpStatus.OK)
    }

    resendOtp=async (req:Request,res:Response) => {
        await this.userAuthService.resendOTP(req.body,res);
        successResponse(
            res,
            "Otp resend Successfully",
            null,
            HttpStatus.OK
        )
    }

    logoutUser = async (
        req: Request,

        res: Response
    ): Promise<void> => {

        const userId =
            req.user?.userId;
            if(!userId)
            {
                throw new UnauthorizedError("User ID is missing")
            }

        await this.userAuthService
            .logoutuser({userId},res);

        successResponse(

            res,

            "Logout successful",

            null,

            HttpStatus.OK
        );
    };

    refreshToken=async (req:Request,res:Response):Promise<void> => {
       const refreshToken=req.cookies.refreshToken;
       await this.userAuthService.refreshToken(refreshToken,res) 
       successResponse(res,"Token refreshed",null,HttpStatus.OK)
    }


    forgotPassword=async (req:Request,res:Response):Promise<void> => {
        const {email}=req.body;
        await this.userAuthService.forgotPassword({email},res);
        successResponse(res,"OTP sent to email for password reset",null,HttpStatus.OK);
    }

    verifyForgotPasword=async (req:Request,res:Response) => {
        const {userId,otp}=req.body;
        await this.userAuthService.verifyResetOtp({userId,otp},res);
        successResponse(res,"OTP verified successfully",null,HttpStatus.OK);
        
    }
    resetPassword=async (req:Request,res:Response) => {
        const {userId,otp,newPassword}=req.body;
        await this.userAuthService.resetPassword({userId,otp,newPassword},res)
        successResponse(res,"Password reset successfully",null,HttpStatus.OK)
    }

    
}