import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { CreatePackageDTO, UpdatePackageDTO } from "../dtos/trainerPackage.dto.js";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.js";
import type { ITrainerPackage } from "../models/TrainerPackage.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
import { NotFoundError, UnauthorizedError } from "../errors/index.js";

@injectable()
export class TrainerPackageService implements ITrainerPackageService {
    constructor(@inject(TOKENS.ITrainerPackageRepository) private trainerpackagerepository: ITrainerPackageRepository) {}

    createPackage = async (trainerId: string, data: CreatePackageDTO): Promise<ITrainerPackage> => {
        const pkg = await this.trainerpackagerepository.create({
            trainerId,
            ...data
        });
        return pkg;
    }

    updatePackage = async (trainerId: string, data: UpdatePackageDTO, packageId: string): Promise<ITrainerPackage> => {
        const pkg = await this.trainerpackagerepository.findPackageById(packageId);
        if (!pkg) {
            throw new NotFoundError("Package Not Found");
        }
        if (pkg.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("You Cannot Edit this package");
        }
        const updatedPackage = await this.trainerpackagerepository.updatePackage(packageId, data);
        return updatedPackage;
    }

    deletePackage = async (trainerId: string, packageId: string): Promise<void> => {
        const pkg = await this.trainerpackagerepository.findPackageById(packageId);
        if (!pkg) {
            throw new NotFoundError("Package Not Found");
        }
        if (pkg.trainerId.toString() !== trainerId) {
            throw new UnauthorizedError("Not Authorized");
        }
        pkg.isActive = false;
        await this.trainerpackagerepository.save(pkg);
    }

    getActivePackages = async (trainerId: string, isActive: true): Promise<ITrainerPackage[]> => {
        const packages = await this.trainerpackagerepository.findActiveByTrainer(trainerId);
        return packages;
    }

    getPackageById = async (packageId: string): Promise<ITrainerPackage> => {
        const pkg = await this.trainerpackagerepository.findPackageById(packageId);
        if (!pkg) {
            throw new NotFoundError("Package Not Found");
        }
        return pkg;
    }

    getTrainerPackages = async (trainerId: string): Promise<ITrainerPackage[]> => {
        const trainer = await this.trainerpackagerepository.findPackageByTrainer(trainerId);
        return trainer;
    }
}