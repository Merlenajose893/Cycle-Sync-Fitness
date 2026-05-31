import  { inject,injectable } from "tsyringe";
import type { ITrainerAuthService } from "../interfaces/services/ITrainerAuthService.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import bcrypt from "bcryptjs";
import { UnauthorizedError,BadRequestError,ConflictError, NotFoundError } from "../errors/index.js";
import type { TrainerRegisterDTO,LoginTrainerDTO,VerifyTrainerDTO } from "../dtos/trainerauth.dto.js";

import { TOKENS } from "../container/tokens.js";
import type { Response } from "express";
@injectable()
export class TrainerAuthService implements ITrainerAuthService{
constructor(@inject(TOKENS.ITrainerRepository) private trainerRepository:ITrainerRepository,@inject(TOKENS.OtpService) private otpService:IOtpService ,@inject(TOKENS.TokenService) private tokenService:ITokenService)
{

}

registerTrainer=async(data: TrainerRegisterDTO): Promise<void>=> {
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
        speciality:data.speciality
    })

    await this.otpService.createAndSentOtp(trainer._id.toString(),"trainer",trainer.email,"email-verification")
}
loginTrainer=async(data: LoginTrainerDTO, res: Response): Promise<void> =>{
    const trainer=await this.trainerRepository.findByEmail(data.email);
    if(!trainer)
    {
        throw new UnauthorizedError("Invalid Credentials")
    }

    const isCompare=await bcrypt.compare(data.password,trainer.password);
    if(!isCompare)
    {
        throw new UnauthorizedError("Invalid Credentials")
    }
    await this.tokenService.generateAndSetAccessToken({
        userId:trainer._id.toString(),
        role:"trainer"
    },res)

    await this.tokenService.generateAndSetRefreshToken({userId:trainer._id.toString(),role:"trainer"},res)

}
verifyTrainerOtp=async(data: VerifyTrainerDTO): Promise<void> =>{
    await this.otpService.verifyOtp(data.trainerId,"email-verification",data.otp);
    const trainer=await this.trainerRepository.findById(data.trainerId);
    if(!trainer)
    {
        throw new NotFoundError("Trainer not found")
    }
    trainer.isEmailVerified=true;
    await this.trainerRepository.save(trainer)

}

logoutTrainer=async(trainerId: string, res: Response): Promise<void>=> {
    await this.tokenService.clearTokens(trainerId,res)
}
}