import type { UpdateTrainerCertificateDTO, UpdateTrainerPackageDTO, UpdateTrainerProfileDTO } from "../../dtos/traineronboarding.dto.ts";
import type { ITrainer } from "../../models/Trainer.ts";

export interface ITrainerOnboardingService{
    getTrainerOnboardingStatus(trainerId:string):Promise<ITrainer>;
    updateTrainerProfile(trainerId:string,data:UpdateTrainerProfileDTO):Promise<ITrainer>;
    updateTrainerCertifications(trainerId:string,data:UpdateTrainerCertificateDTO):Promise<ITrainer>;
    updateTrainerPackages(trainerId:string,data:UpdateTrainerPackageDTO):Promise<ITrainer>;
    completeTrainerOnboardingStatus(trainerId:string):Promise<ITrainer>;
    uploadAvatar(trainerId:string,file:Express.Multer.File):Promise<ITrainer>;
    uploadDocuments(trainerId:string,files:Express.Multer.File[]):Promise<ITrainer>;
}