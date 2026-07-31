import type { UpdatePackageDTO } from "../dtos/trainerPackage.dto.js";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.js";
import type { ITrainerPackage } from "../models/TrainerPackage.js";
import { BaseRepository } from "./BaseRepository.js";

export class TrainerPackageRepository extends BaseRepository<ITrainerPackage> implements ITrainerPackageRepository{
    findPackageByTrainer(trainerId: string): Promise<ITrainerPackage[]> {
        return this.model.find({trainerId:trainerId});
    }
    findActiveByTrainer(trainerId: string): Promise<ITrainerPackage[]> {
        return this.model.find({trainerId,isActive:true});
    }
    findPackageById(packageId: string): Promise<ITrainerPackage | null> {
        return this.model.findById(packageId);
    }
    updatePackage(packageId: string, data: UpdatePackageDTO): Promise<ITrainerPackage | null> {
        return this.model.findByIdAndUpdate(packageId,data,{new:true});
    }
    deletePackage(packageId: string): Promise<void> {
        return this.model.findByIdAndUpdate(packageId,{isActive:false})
    }
}