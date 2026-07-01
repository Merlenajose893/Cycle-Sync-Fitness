import type { UpdateTrainerCertificateDTO, UpdateTrainerPackageDTO, UpdateTrainerProfileDTO } from "../../dtos/traineronboarding.dto.js";
import type { ITrainer } from "../../models/Trainer.js";
export interface ITrainerOnboardingService {
    getTrainerOnboardingStatus(trainerId: string): Promise<ITrainer>;
    updateTrainerProfile(trainerId: string, data: UpdateTrainerProfileDTO): Promise<ITrainer>;
    updateTrainerCertifications(trainerId: string, data: UpdateTrainerCertificateDTO): Promise<ITrainer>;
    updateTrainerPackages(trainerId: string, data: UpdateTrainerPackageDTO): Promise<ITrainer>;
    completeTrainerOnboardingStatus(trainerId: string): Promise<ITrainer>;
}
//# sourceMappingURL=ITrainerOnboardingService.d.ts.map