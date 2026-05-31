import type { TrainerRegisterDTO,LoginTrainerDTO,VerifyTrainerDTO } from "../../dtos/trainerauth.dto.js";
import type { Response } from "express";
export interface ITrainerAuthService{
    registerTrainer(data:TrainerRegisterDTO):Promise<void>;
    loginTrainer(data:LoginTrainerDTO,res:Response):Promise<void>;
    verifyTrainerOtp(data:VerifyTrainerDTO):Promise<void>;
    logoutTrainer(trainerId:string,res:Response):Promise<void>;

}