import { inject,injectable } from "tsyringe";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.ts";
import type { ITrainerPackageRepository } from "../interfaces/repositories/ITrainerPackageRepository.ts";
import type { ITrainer } from "../models/Trainer.ts";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.ts";
import { TOKENS } from "../container/tokens.ts";
import type { UpdateTrainerProfileDTO,UpdateTrainerCertificateDTO,UpdateTrainerPackageDTO } from "../dtos/traineronboarding.dto.ts";
import { TrainerOnboardingMapper } from "../mappers/TrainerOnboardingMapper.ts";
import { BadRequestError, NotFoundError } from "../errors/index.ts";
import type { IImageService } from "../interfaces/services/IImageService.ts";
import { TrainerStatus } from "../constants/TrainerStatus.ts";

@injectable()
export class TrainerOnboardingService implements ITrainerOnboardingService{
constructor(
    @inject(TOKENS.ITrainerRepository) private trainerRepository:ITrainerRepository, 
    @inject(TOKENS.IImageService) private imageService:IImageService,
    @inject(TOKENS.ITrainerPackageRepository) private trainerPackageRepository:ITrainerPackageRepository
)
{

}

getTrainerOnboardingStatus=async (trainerId: string): Promise<ITrainer>=> {
   const trainer=await this.trainerRepository.findById(trainerId);
   if(!trainer)
   {
    throw new NotFoundError("Trainer Not found")
   }

   return trainer;

}
updateTrainerProfile=async(trainerId: string, data: UpdateTrainerProfileDTO): Promise<ITrainer> =>{
 const trainer=await this.trainerRepository.findById(trainerId);
 if(!trainer)
    {
        throw new NotFoundError("Trainer not found")
    }   
    Object.assign(trainer,TrainerOnboardingMapper.toTrainerProfile(data));
    trainer.onboardingSteps=2;
    return this.trainerRepository.save(trainer);
}
updateTrainerCertifications=async (trainerId: string, data: UpdateTrainerCertificateDTO): Promise<ITrainer>=> {
    const trainer=await this.trainerRepository.findById(trainerId);
    if(!trainer)
    {
        throw new NotFoundError("Trainer not found");
    }
    trainer.certifications=TrainerOnboardingMapper.toTrainerCertifications(data).certifications;
    trainer.onboardingSteps=3;
    return this.trainerRepository.save(trainer)


}
updateTrainerPackages=async (trainerId: string, data: UpdateTrainerPackageDTO): Promise<ITrainer>=> {
    const trainer=await this.trainerRepository.findById(trainerId);
    if(!trainer)
    {
        throw new NotFoundError("Trainer not found")
    }
    trainer.packages=TrainerOnboardingMapper.toTrainerPackages(data).packages;
    const savedTrainer = await this.trainerRepository.save(trainer);

    try {
        const existingPackages = await this.trainerPackageRepository.findPackageByTrainer(trainerId);
        for (const pkg of existingPackages) {
            await this.trainerPackageRepository.deletePackage(pkg._id.toString());
        }

        for (const pkg of trainer.packages) {
            let durationDays = 30;
            if (pkg.duration === "1_week") durationDays = 7;
            else if (pkg.duration === "1_month") durationDays = 30;
            else if (pkg.duration === "3_months") durationDays = 90;
            else if (pkg.duration === "6_months") durationDays = 180;
            else if (typeof (pkg as any).durationDays === "number") durationDays = (pkg as any).durationDays;

            await this.trainerPackageRepository.create({
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
    } catch (err) {
        console.error("Error syncing trainer packages to repository:", err);
    }

    return savedTrainer;
}
completeTrainerOnboardingStatus=async(trainerId: string): Promise<ITrainer> =>{
    const trainer=await this.trainerRepository.findById(trainerId);
    if(!trainer)
    {
        throw new NotFoundError("Trainer Not found")
    }
    if(trainer.status!==TrainerStatus.ONBOARDING && trainer.status!==TrainerStatus.REJECTED)
    {
        throw new BadRequestError("Trainer cannot submit onboarding")
    }
    trainer.status=TrainerStatus.PENDING_APPROVAL;
    trainer.rejectionReason = null;
    trainer.onboardingCompleted=true;
    return this.trainerRepository.save(trainer);
}

uploadDocuments=async(trainerId: string, files: Express.Multer.File[]): Promise<ITrainer> =>{
    const trainer=await this.trainerRepository.findById(trainerId);
    if(!trainer)
    {
        throw new NotFoundError("Trainer Not found");
    }
    if(!files || files.length === 0)
    {
        throw new BadRequestError("No files uploaded");
    }

    const newDocuments = [];
    for (const file of files) {
        const image = await this.imageService.uploadImage(file);
        newDocuments.push({
            type: (file.originalname.toLowerCase().includes('cert') ? 'CERTIFICATE' : 'ID') as 'ID' | 'CERTIFICATE',
            url: image.url,
            name: file.originalname
        });
    }

    trainer.documents = [...(trainer.documents || []), ...newDocuments];
    await this.trainerRepository.save(trainer);
    return trainer;
}

uploadAvatar=async(trainerId: string, file: Express.Multer.File): Promise<ITrainer> =>{
    const trainer=await this.trainerRepository.findById(trainerId);
    console.log(trainer);
    
    if(!trainer)
    {
        throw new NotFoundError("Trainer Not found");
    }
    if(file===undefined)
    {
        throw new BadRequestError("File is Undefined")
    }
    const image=await this.imageService.uploadImage(file);
    trainer.avatar=image.url;
    trainer.avatarPublicId=image.publicId;

    await this.trainerRepository.save(trainer);
    return trainer;
}
}