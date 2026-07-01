import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.js";
import type { UpdateTrainerProfileDTO, UpdateTrainerCertificateDTO, UpdateTrainerPackageDTO } from "../dtos/traineronboarding.dto.js";
export declare class TrainerOnboardingService implements ITrainerOnboardingService {
    private trainerRepository;
    constructor(trainerRepository: ITrainerRepository);
    getTrainerOnboardingStatus: (trainerId: string) => Promise<ITrainer>;
    updateTrainerProfile: (trainerId: string, data: UpdateTrainerProfileDTO) => Promise<ITrainer>;
    updateTrainerCertifications: (trainerId: string, data: UpdateTrainerCertificateDTO) => Promise<ITrainer>;
    updateTrainerPackages: (trainerId: string, data: UpdateTrainerPackageDTO) => Promise<ITrainer>;
    completeTrainerOnboardingStatus: (trainerId: string) => Promise<ITrainer>;
}
//# sourceMappingURL=TrainerOnbaordingService.d.ts.map