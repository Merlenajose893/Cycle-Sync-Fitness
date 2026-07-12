import type { Request,Response,NextFunction } from "express";
import { injectable,inject } from "tsyringe";
import type { ITrainerAuthService } from "../interfaces/services/ITrainerAuthService.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import { UnauthorizedError } from "../errors/index.js";
import type { registerTrainerInviteDTO } from "../dtos/trainerauth.dto.js";
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
    loginTrainer = async (req: Request, res: Response): Promise<void> => {
    const result = await this.trainerAuthService.loginTrainer(req.body, res);

    successResponse(
        res,
        "Trainer login successful",
        result,           
        HttpStatus.OK
    );
}
    logoutTrainer=async (req:Request,res:Response):Promise<void> => {
        const trainerId=req.user?.userId;
        if(!trainerId)
        {
            throw new UnauthorizedError("Trainer ID is missing")
        }
        await this.trainerAuthService.logoutTrainer(trainerId,res)

        successResponse(res,"Trainer logout successfull",null,HttpStatus.OK)
    }

    verifyTrainer=async (req:Request,res:Response,next:NextFunction):Promise<void> => {
        try {
            const token=req.query.token as string;
            const result=await this.trainerAuthService.verifyTrainerInvite(token,res);

            successResponse(res,"Trainer Invite is verified",result,HttpStatus.OK)
        } catch (error) {
            next(error)
        }
    }
    registerFromInvite=async (req:Request,res:Response,next:NextFunction) => {
        const data:registerTrainerInviteDTO=req.body;
        const result=await this.trainerAuthService.registerTrainerInvite(data);
        successResponse(res,"Registration invite done",result,HttpStatus.OK)
    }

}