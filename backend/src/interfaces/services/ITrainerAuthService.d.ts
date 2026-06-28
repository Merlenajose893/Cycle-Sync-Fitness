import type { TrainerRegisterDTO, LoginTrainerDTO, VerifyTrainerDTO } from "../../dtos/trainerauth.dto.js";
import type { Response } from "express";
import type { ITrainer } from "../../models/Trainer.js";
export interface ITrainerAuthService {
    registerTrainer(data: TrainerRegisterDTO): Promise<ITrainer>;
    loginTrainer(data: LoginTrainerDTO, res: Response): Promise<void>;
    verifyTrainerOtp(data: VerifyTrainerDTO, res: Response): Promise<void>;
    logoutTrainer(trainerId: string, res: Response): Promise<void>;
    resendOTP(trainerId: string): Promise<void>;
}
//# sourceMappingURL=ITrainerAuthService.d.ts.map