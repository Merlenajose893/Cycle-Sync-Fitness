import { injectable } from "tsyringe";
import mongoose from "mongoose";
import type { OtpType,UserType,IOtp } from "../models/Otp.js";
import { otpModel } from "../models/Otp.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";
import { BaseRepository } from "./BaseRepository.js";

@injectable()
export class OtpRepository extends BaseRepository<IOtp>implements IOtpRepository{
    constructor()
    {
        super(otpModel)
    }

    async createOtp(userId:string,userType:UserType,email:string,otp:string,type:OtpType):Promise<IOtp>
    {
        await this.model.deleteOne({userId: new mongoose.Types.ObjectId(userId),type})
        const expiresAt=new Date(Date.now()+10*60*1000)
        console.log(expiresAt);
        

      const createdOtp=  await this.model.create({
            userId:new mongoose.Types.ObjectId(userId),
            userType,
            email,
            otp,
            type,
            expiresAt
        });

        return createdOtp;
    }

    async findOtp(userId:string,type:OtpType):Promise<IOtp|null>
    {
        return this.model.findOne({
            userId:new mongoose.Types.ObjectId(userId),
            type
        })
    }

    


    async deleteOtp(userId:string,type:OtpType):Promise<void>
    {
         await this.model.deleteOne({userId:new mongoose.Types.ObjectId(userId),type})
    }
}