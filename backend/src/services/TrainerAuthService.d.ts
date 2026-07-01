import type { ITrainerAuthService } from "../interfaces/services/ITrainerAuthService.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { TrainerRegisterDTO, LoginTrainerDTO, VerifyTrainerDTO } from "../dtos/trainerauth.dto.js";
import type { Response } from "express";
export declare class TrainerAuthService implements ITrainerAuthService {
    private trainerRepository;
    private otpService;
    private tokenService;
    constructor(trainerRepository: ITrainerRepository, otpService: IOtpService, tokenService: ITokenService);
    registerTrainer: (data: TrainerRegisterDTO) => Promise<import("../models/Trainer.js").ITrainer>;
    loginTrainer: (data: LoginTrainerDTO, res: Response) => Promise<void>;
    verifyTrainerOtp: (data: VerifyTrainerDTO, res: Response) => Promise<void>;
    resendOTP: (trainerId: string) => Promise<void>;
    logoutTrainer: (trainerId: string, res: Response) => Promise<void>;
}
//# sourceMappingURL=TrainerAuthService.d.ts.map