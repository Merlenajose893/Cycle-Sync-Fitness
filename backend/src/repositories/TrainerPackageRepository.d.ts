import type { UpdatePackageDTO } from "../dtos/trainerPackage.dto.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
import type { ITrainerPackage } from "../models/Trainer.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class TrainerPackageRepository extends BaseRepository<ITrainerPackage> implements ITrainerPackageRepository {
    constructor();
    findPackageByTrainer(trainerId: string): Promise<ITrainerPackage[]>;
    findActiveByTrainer(trainerId: string): Promise<ITrainerPackage[]>;
    findPackageById(packageId: string): Promise<ITrainerPackage | null>;
    updatePackage(packageId: string, data: UpdatePackageDTO): Promise<ITrainerPackage | null>;
    deletePackage(packageId: string): Promise<void>;
}
//# sourceMappingURL=TrainerPackageRepository.d.ts.map