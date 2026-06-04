import { injectable,inject } from "tsyringe";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";
import type { IEmailService } from "../interfaces/services/IEmailService.js";
import bcrypt from "bcryptjs";
// import { UnauthorizedError } from "../errors/index.js";
import { TOKENS } from "../container/tokens.js";
import type { OtpType,UserType } from "../models/Otp.js";
import type { OtpRepository } from "../repositories/OtpRepository.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { LoginTicket } from "google-auth-library";
@injectable()
export class OtpService implements IOtpService{
    constructor(@inject (TOKENS.IOtpRepository) private otpRepository:IOtpRepository,@inject(TOKENS.IEmailService) private emailService:IEmailService){}

    createAndSentOtp=async(userId: string, userType: UserType, email: string, type: OtpType): Promise<void> =>{
    //    const otp=Math.floor(10000+Math.random()*900000).toString();
    const otp =
  Math.floor(
    100000 + Math.random() * 900000
  ).toString();
       console.log(otp);
       
       const hashedOtp=await bcrypt.hash(otp,10);
       await this.otpRepository.createOtp(
        userId,
        userType,
        email,
        hashedOtp,
        type

       ) 
       await this.emailService.sendOtpEmail(email,otp)
    }

    verifyOtp=async(userId: string, type: OtpType, otp: string): Promise<void>=> {
        const existOtp=await this.otpRepository.findOtp(userId,type);
        
        if(!existOtp)
        {
            throw new NotFoundError("OTP not found")
        }
        if(existOtp.expiresAt<new Date())
        {
            throw new BadRequestError("Otp expired")
        }
        const otpValid=await bcrypt.compare(otp,existOtp.otp)
        if(!otpValid)
        {
            throw new BadRequestError("Invalid OTP")
        }

        await this.otpRepository.deleteOtp(userId,type)
    }

    resendOTP=async(userId: string, userType: UserType, email: string, type: OtpType): Promise<void> =>{
       const ans= await this.createAndSentOtp(userId,userType,email,type)
       console.log(ans);
       
    }
}

