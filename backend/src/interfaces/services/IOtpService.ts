import type { OtpType,UserType} from "../../models/Otp.js";

export interface IOtpService{
    
createAndSentOtp(userId:string,userType:UserType,email:string,type:OtpType):Promise <void>;
verifyOtp(userId:string,type:OtpType,otp:string):Promise<void>;
resendOTP(userId:string,userType:UserType,email:string,type:OtpType):Promise<void>;
}