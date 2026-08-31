import type { UpdatePackageDTO } from "../../dtos/trainerPackage.dto.ts";
import type { ITrainerPackage } from "../../models/TrainerPackage.ts";
import type { IBaseRepository } from "./IBaseRepository.ts";

export interface ITrainerPackageRepository extends IBaseRepository<ITrainerPackage>{
findPackageByTrainer(trainerId:string):Promise<ITrainerPackage[]>;
findActiveByTrainer(trainerId:string):Promise<ITrainerPackage[]>;
findPackageById(packageId:string):Promise<ITrainerPackage|null>;
updatePackage(packageId:string,data:UpdatePackageDTO):Promise<ITrainerPackage|null>;
deletePackage(packageId:string):Promise<void>;
}