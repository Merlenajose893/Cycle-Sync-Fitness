import type { IOtpService } from "../interfaces/services/IOtpService.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";
import type { IEmailService } from "../interfaces/services/IEmailService.js";
import type { OtpType, UserType } from "../models/Otp.js";
export declare class OtpService implements IOtpService {
    private otpRepository;
    private emailService;
    constructor(otpRepository: IOtpRepository, emailService: IEmailService);
    createAndSentOtp: (userId: string, userType: UserType, email: string, type: OtpType) => Promise<void>;
    verifyOtp: (userId: string, type: OtpType, otp: string) => Promise<void>;
    resendOTP: (userId: string, userType: UserType, email: string, type: OtpType) => Promise<void>;
}
//# sourceMappingURL=OtpService.d.ts.map