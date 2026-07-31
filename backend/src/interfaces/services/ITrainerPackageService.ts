import type { CreatePackageDTO, UpdatePackageDTO } from "../../dtos/trainerPackage.dto.js";
import type { ITrainerPackage } from "../../models/TrainerPackage.js";

export interface ITrainerPackageService{
    createPackage(trainerId:string,data:CreatePackageDTO):Promise<ITrainerPackage>;
    updatePackage(trainerId:string,data:UpdatePackageDTO,packageId:string):Promise<ITrainerPackage>;
    deletePackage(trainerId:string,packageId:string):Promise<void>;
    getTrainerPackages(trainerId:string):Promise<ITrainerPackage[]>;
    getActivePackages(trainerId:string,isActive:true):Promise<ITrainerPackage[]>;
    getPackageBtId(packageId:string):Promise<ITrainerPackage>;
}