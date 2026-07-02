import type { Request,Response,NextFunction } from "express";
import { injectable,inject } from "tsyringe";
import type { ITrainerAuthService } from "../interfaces/services/ITrainerAuthService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import { UnauthorizedError } from "../errors/index.js";
@injectable()
export class TrainerAuthController{
    constructor(@inject(TOKENS.ITrainerAuthService) private trainerAuthService:ITrainerAuthService)
    {

    }
    registerTrainer=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        const result=await this.trainerAuthService.registerTrainer(req.body)
        successResponse(
            res,"Trainer Registered Successfully",result,HttpStatus.CREATED
        )

    }

    verifyTrainerOTP=async (req:Request,res:Response):Promise<void> => {
        await this.trainerAuthService.verifyTrainerOtp(req.body,res);
        successResponse(res,"Trainer email verified",null,HttpStatus.OK)
    }

    resendTrainerOTP=async (req:Request,res:Response) => {
        const {trainerId}=req.body;
        await this.trainerAuthService.resendOTP(trainerId);
        successResponse(res,"OTP resent successfully",null,HttpStatus.OK)
    }
    loginTrainer=async (req:Request,res:Response):Promise<void> => {
        await this.trainerAuthService.loginTrainer(req.body,res);
        successResponse(res,"Trainer login successful",null,HttpStatus.OK);
    }
    logoutTrainer=async (req:Request,res:Response):Promise<void> => {
        const trainerId=req.user?.userId;
        if(!trainerId)
        {
            throw new UnauthorizedError("Trainer ID is missing")
        }
        await this.trainerAuthService.logoutTrainer(trainerId,res)
        const traineriD=req.user?.userId;
        await this.trainerAuthService.logoutTrainer(traineriD,res)

        successResponse(res,"Trainer logout successfull",null,HttpStatus.OK)
    }

}