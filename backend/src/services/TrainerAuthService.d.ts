import type { ITrainerAuthService } from "../interfaces/services/ITrainerAuthService.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { TrainerRegisterDTO, LoginTrainerDTO, VerifyTrainerDTO, ForgotPasswordDTO, ResetPasswordDTO, ForgotPasswordResponseDTO, registerTrainerInviteDTO, loginTrainerResponseDTO } from "../dtos/trainerauth.dto.js";
import type { Response } from "express";
import type { ITrainer } from "../models/Trainer.js";
export declare class TrainerAuthService implements ITrainerAuthService {
    private trainerRepository;
    private otpService;
    private tokenService;
    constructor(trainerRepository: ITrainerRepository, otpService: IOtpService, tokenService: ITokenService);
    registerTrainer: (data: TrainerRegisterDTO) => Promise<ITrainer>;
    loginTrainer: (data: LoginTrainerDTO, res: Response) => Promise<loginTrainerResponseDTO>;
    verifyTrainerOtp: (data: VerifyTrainerDTO, res: Response) => Promise<void>;
    resendOTP: (trainerId: string) => Promise<void>;
    forgotPassword: (data: ForgotPasswordDTO, res: Response) => Promise<ForgotPasswordResponseDTO>;
    resetPassword: (data: ResetPasswordDTO, res: Response) => Promise<void>;
    logoutTrainer: (trainerId: string, res: Response) => Promise<void>;
    verifyTrainerInvite: (token: string, res: Response) => Promise<ITrainer>;
    registerTrainerInvite: (data: registerTrainerInviteDTO) => Promise<void>;
    getCurrentTrainer: (trainerId: string) => Promise<ITrainer>;
}
//# sourceMappingURL=TrainerAuthService.d.ts.map