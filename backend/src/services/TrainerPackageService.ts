import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.ts";
import type { CreatePackageDTO, UpdatePackageDTO } from "../dtos/trainerPackage.dto.ts";
import type { ITrainerPackageService } from "../interfaces/services/ITrainerPackageService.ts";
import type { ITrainerPackage } from "../models/TrainerPackage.ts";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.ts";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.ts";
import { NotFoundError, UnauthorizedError } from "../errors/index.ts";
import { Types } from "mongoose";

@injectable()
export class TrainerPackageService implements ITrainerPackageService {
    constructor(
        @inject(TOKENS.ITrainerPackageRepository) private trainerpackagerepository: ITrainerPackageRepository,
        @inject(TOKENS.ITrainerRepository) private trainerRepository: ITrainerRepository
    ) {}

    createPackage = async (trainerId: string, data: CreatePackageDTO): Promise<ITrainerPackage> => {
        const pkg = await this.trainerpackagerepository.create({
            trainerId:new Types.ObjectId(trainerId),
            ...data
        });
        return pkg;
    }

    updatePackage = async (trainerId: string, data: UpdatePackageDTO, packageId: string): Promise<ITrainerPackage|null> => {
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

    getActivePackages = async (trainerId: string): Promise<ITrainerPackage[]> => {
        let packages = await this.trainerpackagerepository.findActiveByTrainer(trainerId);

        if (!packages || packages.length === 0) {
            const trainer = await this.trainerRepository.findById(trainerId);
            if (trainer && trainer.packages && trainer.packages.length > 0) {
                for (const pkg of trainer.packages) {
                    let durationDays = 30;
                    if (pkg.duration === "1_week") durationDays = 7;
                    else if (pkg.duration === "1_month") durationDays = 30;
                    else if (pkg.duration === "3_months") durationDays = 90;
                    else if (pkg.duration === "6_months") durationDays = 180;
                    else if (typeof (pkg as any).durationDays === "number") durationDays = (pkg as any).durationDays;

                    await this.trainerpackagerepository.create({
                        trainerId: trainer._id,
                        packageName: pkg.name,
                        description: `${pkg.sessions || 1} Sessions included (${(pkg as any).mode || 'online'})`,
                        durationDays,
                        price: pkg.price,
                        features: [
                            `${pkg.sessions || 1} Sessions included`,
                            `Mode: ${((pkg as any).mode || 'online').toUpperCase()}`,
                            `Personalized workout & nutrition plan`
                        ],
                        isActive: true
                    });
                }
                packages = await this.trainerpackagerepository.findActiveByTrainer(trainerId);
            }
        }

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