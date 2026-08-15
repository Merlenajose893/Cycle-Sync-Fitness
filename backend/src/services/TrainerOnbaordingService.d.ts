import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.js";
import type { UpdateTrainerProfileDTO, UpdateTrainerCertificateDTO, UpdateTrainerPackageDTO } from "../dtos/traineronboarding.dto.js";
import type { IImageService } from "../interfaces/services/IImageService.js";
export declare class TrainerOnboardingService implements ITrainerOnboardingService {
    private trainerRepository;
    private imageService;
    private trainerPackageRepository;
    constructor(trainerRepository: ITrainerRepository, imageService: IImageService, trainerPackageRepository: ITrainerPackageRepository);
    getTrainerOnboardingStatus: (trainerId: string) => Promise<ITrainer>;
    updateTrainerProfile: (trainerId: string, data: UpdateTrainerProfileDTO) => Promise<ITrainer>;
    updateTrainerCertifications: (trainerId: string, data: UpdateTrainerCertificateDTO) => Promise<ITrainer>;
    updateTrainerPackages: (trainerId: string, data: UpdateTrainerPackageDTO) => Promise<ITrainer>;
    completeTrainerOnboardingStatus: (trainerId: string) => Promise<ITrainer>;
    uploadDocuments: (trainerId: string, files: Express.Multer.File[]) => Promise<ITrainer>;
    uploadAvatar: (trainerId: string, file: Express.Multer.File) => Promise<ITrainer>;
}
//# sourceMappingURL=TrainerOnbaordingService.d.ts.map