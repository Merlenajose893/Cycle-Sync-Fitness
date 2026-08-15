import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { IAccountStatusService } from "../interfaces/services/IAccountStatusService.js";
import type { UserRole } from "../types/auth.types.js";
export declare class AccountStatusService implements IAccountStatusService {
    private userRepository;
    private trainerRepository;
    constructor(userRepository: IUserRepository, trainerRepository: ITrainerRepository);
    verifyAccount(userId: string, role: UserRole): Promise<void>;
    private verifyUser;
    private verifyTrainer;
}
//# sourceMappingURL=AccountStatusService.d.ts.map