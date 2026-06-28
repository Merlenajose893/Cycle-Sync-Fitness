import type { Response } from "express";
import type { IUserAuthService } from "../interfaces/services/IUserAuthService.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";
import type { IEmailService } from "../interfaces/services/IEmailService.js";
import type { ITokenService } from "../interfaces/services/ITokenService.js";
import type { LogoutDTO, RegisterUserDTO, ResendOTPDTO, VerifyOtpDTO } from "../dtos/auth.dto.js";
import type { IUser } from "../models/User.js";
import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { LoginDTO } from "../dtos/auth.dto.js";
export declare class UserAuthService implements IUserAuthService {
    private userRepository;
    private otpRepository;
    private emailService;
    private tokenService;
    private otpService;
    constructor(userRepository: IUserRepository, otpRepository: IOtpRepository, emailService: IEmailService, tokenService: ITokenService, otpService: IOtpService);
    registerUser(data: RegisterUserDTO, res: Response): Promise<IUser>;
    verifyEmailOTP: (data: VerifyOtpDTO, res: Response) => Promise<IUser>;
    resendOTP: (data: ResendOTPDTO) => Promise<void>;
    loginUser: (data: LoginDTO, res: Response) => Promise<IUser>;
    logoutuser: (data: LogoutDTO, res: Response) => Promise<void>;
    refreshToken: (refreshToken: string, res: Response) => Promise<void>;
}
//# sourceMappingURL=UserAuthService.d.ts.map