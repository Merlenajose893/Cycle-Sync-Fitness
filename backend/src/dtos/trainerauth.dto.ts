import type { ITrainer } from "../models/Trainer.ts";

export interface TrainerRegisterDTO{
firstName:string;
lastName:string;
email:string;
password:string;
speciality:string;

}

export interface LoginTrainerDTO{
    email:string;
    password:string;
}

export interface VerifyTrainerDTO{
    trainerId:string;
    otp:string;

}

export interface ForgotPasswordDTO{
    email:string;
}

export interface ResetPasswordDTO{
    userId:string;
    otp:string;
    newPassword:string;

}
export interface ForgotPasswordResponseDTO{
    userId:string;
    email:string;
    message?:string;

}
export interface registerTrainerInviteDTO{
    token:string;
    password:string;
}

export interface loginTrainerResponseDTO{
    trainer:ITrainer;
    
}