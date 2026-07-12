import  { inject,injectable } from "tsyringe";
import type { ITrainerAuthService } from "../interfaces/services/ITrainerAuthService.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import bcrypt from "bcryptjs";
import { UnauthorizedError,BadRequestError,ConflictError, NotFoundError, ForbiddenError } from "../errors/index.js";

import type { TrainerRegisterDTO,LoginTrainerDTO,VerifyTrainerDTO,ForgotPasswordDTO,ResetPasswordDTO, ForgotPasswordResponseDTO, registerTrainerInviteDTO, loginTrainerResponseDTO } from "../dtos/trainerauth.dto.js";




import { TOKENS } from "../container/tokens.js";
import type { Response } from "express";
// import { email } from "zod";
import type { ITrainer } from "../models/Trainer.js";
import { TrainerStatus } from "../constants/TrainerStatus.js";
// import { TRAINER_NEXT_STEP } from "../constants/Trainer-next-step.js";
@injectable()
export class TrainerAuthService implements ITrainerAuthService{
constructor(@inject(TOKENS.ITrainerRepository) private trainerRepository:ITrainerRepository,@inject(TOKENS.IOtpService) private otpService:IOtpService ,@inject(TOKENS.ITokenService) private tokenService:ITokenService)
{

}

registerTrainer=async(data: TrainerRegisterDTO)=> {
    const existingTrainer=await this.trainerRepository.findByEmail(data.email);
    if(existingTrainer)
    {
throw new ConflictError("Trainer already exists")
    }
    const hashedPassword=await bcrypt.hash(data.password,10);
    const trainer=await this.trainerRepository.create({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:hashedPassword,
        speciality:data.speciality,
        status:TrainerStatus.REGISTERED,
        onboardingCompleted:false,
        onboardingSteps:1,
        rejectionReason:null
    })

    await this.otpService.createAndSentOtp(trainer._id.toString(),"trainer",trainer.email,"email-verification");


    return trainer;

   

}


loginTrainer=async(data: LoginTrainerDTO, res: Response): Promise<loginTrainerResponseDTO> =>{
    const trainer=await this.trainerRepository.findByEmail(data.email);
    if(!trainer)
    {
        throw new UnauthorizedError("Invalid Credentials")
    }

    const isCompare=await bcrypt.compare(data.password,trainer.password!);
    if(!isCompare)
    {
        throw new UnauthorizedError("Invalid Credentials")
    }

    if(trainer.isDeleted)
    {
        throw new ForbiddenError("Your account is blocked")
    }
    await this.tokenService.generateAndSetAccessToken({
        userId:trainer._id.toString(),
        role:"trainer"
    },res)

    await this.tokenService.generateAndSetRefreshToken({userId:trainer._id.toString(),role:"trainer"},res)

    
    return {trainer}

}


verifyTrainerOtp=async(data: VerifyTrainerDTO,res:Response): Promise<void> =>{

    await this.otpService.verifyOtp(data.trainerId,"email-verification",data.otp);
    const trainer=await this.trainerRepository.findById(data.trainerId);
    if(!trainer)
    {
        throw new NotFoundError("Trainer not found")
    }
    trainer.isEmailVerified=true;
    await this.trainerRepository.save(trainer)

}

resendOTP=async(trainerId: string): Promise<void>=> {
    const trainer=await this.trainerRepository.findById(trainerId);
    console.log(trainer);
    
    if(!trainer)
    {
        throw new NotFoundError("Trainer not found")
    }

    if(trainer.isEmailVerified)
    {
        throw new BadRequestError("Emaol already verified")
    }

    await this.otpService.createAndSentOtp(
        trainer._id.toString(),
        "trainer",
        trainer.email,
        "email-verification"
    )
}


forgotPassword=async(data: ForgotPasswordDTO, res: Response): Promise<ForgotPasswordResponseDTO> =>{
    const trainer=await this.trainerRepository.findByEmail(data.email);
    if(!trainer)
    {
        throw new NotFoundError("Trainer Not  found")
    }

     await this.otpService.createAndSentOtp(trainer._id.toString(),"trainer",trainer.email,"password-reset");
     return{
        
        userId:trainer._id.toString(),
        email:trainer.email,
        message:"Password reset OTP has been sent to your email"
     }
}

resetPassword=async(data: ResetPasswordDTO, res: Response): Promise<void> =>{
    await this.otpService.verifyOtp(data.userId,"password-reset",data.otp);
    const trainer=await this.trainerRepository.findById(data.userId);
    if(!trainer)
    {
        throw new NotFoundError("Trainer not Found")
    }
    trainer.password=await bcrypt.hash(data.newPassword,10);
    await this.trainerRepository.save(trainer)
}


logoutTrainer=async(trainerId: string, res: Response): Promise<void>=> {
    await this.tokenService.clearTokens(trainerId,res)
}

verifyTrainerInvite=async(token: string,res:Response): Promise<ITrainer> =>{
    const trainer=await this.trainerRepository.findByInviteToken(token);
    if(!trainer)
    {
        throw new BadRequestError("Invalid Token")
    }
    if(trainer.inviteAccepted)
    {
        throw new BadRequestError("Trainer is already invided")
    }
    if(trainer.inviteExpiresAt && trainer.inviteExpiresAt<new Date())
    {
        throw new BadRequestError("Token is expired")
    }
    return trainer;
}

registerTrainerInvite=async(data: registerTrainerInviteDTO): Promise<void> =>{
    const trainer=await this.trainerRepository.findByInviteToken(data.token);
    if(!trainer)
    {
        throw new BadRequestError("Invalid Invitation")
    }

    if(trainer.inviteAccepted)
    {
        throw new BadRequestError("Trainer alreafy invided")
    }
    if(trainer.inviteExpiresAt && trainer.inviteExpiresAt<new Date())
    {
        throw new BadRequestError("Token is expired")
    }
    const hashedPassword=await bcrypt.hash(data.password,10);

    await this.trainerRepository.acceptTrainer(trainer._id!,hashedPassword);
}


}

