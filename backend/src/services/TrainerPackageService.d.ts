import type { CreatePackageDTO, UpdatePackageDTO } from "../dtos/trainerPackage.dto.js";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.js";
import type { ITrainerPackage } from "../models/TrainerPackage.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
export declare class TrainerPackageService implements ITrainerPackageService {
    private trainerpackagerepository;
    private trainerRepository;
    constructor(trainerpackagerepository: ITrainerPackageRepository, trainerRepository: ITrainerRepository);
    createPackage: (trainerId: string, data: CreatePackageDTO) => Promise<ITrainerPackage>;
    updatePackage: (trainerId: string, data: UpdatePackageDTO, packageId: string) => Promise<ITrainerPackage>;
    deletePackage: (trainerId: string, packageId: string) => Promise<void>;
    getActivePackages: (trainerId: string) => Promise<ITrainerPackage[]>;
    getPackageById: (packageId: string) => Promise<ITrainerPackage>;
    getTrainerPackages: (trainerId: string) => Promise<ITrainerPackage[]>;
}
//# sourceMappingURL=TrainerPackageService.d.ts.map