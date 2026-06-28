import type { OtpType, UserType, IOtp } from "../models/Otp.js";
import type { IOtpRepository } from "../interfaces/repositories/IOtpRepository.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository {
    constructor();
    createOtp(userId: string, userType: UserType, email: string, otp: string, type: OtpType): Promise<IOtp>;
    findOtp(userId: string, type: OtpType): Promise<IOtp | null>;
    deleteOtp(userId: string, type: OtpType): Promise<void>;
}
//# sourceMappingURL=OtpRepository.d.ts.map