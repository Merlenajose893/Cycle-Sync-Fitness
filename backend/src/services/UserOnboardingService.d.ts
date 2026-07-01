import type { IUserOnboardingService } from "../interfaces/services/IUserOnboardingService.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { IUser } from "../models/User.js";
import type { UpdateBodyDetailsDTO, UpdateCycleSetUpDTO, UpdateGoals } from "../dtos/useronboarding.dto.js";
export declare class UserOnboardingService implements IUserOnboardingService {
    private userRepository;
    constructor(userRepository: IUserRepository);
    getOnboardingStatus: (userId: string) => Promise<IUser>;
    updateBodyDetails: (userId: string, data: UpdateBodyDetailsDTO) => Promise<IUser>;
    updateCycleSetUp: (userId: string, data: UpdateCycleSetUpDTO) => Promise<IUser>;
    updateGoals: (userId: string, data: UpdateGoals) => Promise<IUser>;
    completeOnboarding: (userId: string) => Promise<IUser>;
}
//# sourceMappingURL=UserOnboardingService.d.ts.map