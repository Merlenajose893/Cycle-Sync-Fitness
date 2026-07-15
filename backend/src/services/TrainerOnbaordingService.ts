import { inject,injectable } from "tsyringe";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.js";
import { TOKENS } from "../container/tokens.js";
import type { UpdateTrainerProfileDTO,UpdateTrainerCertificateDTO,UpdateTrainerPackageDTO } from "../dtos/traineronboarding.dto.js";
import { TrainerOnboardingMapper } from "../mappers/TrainerOnboardingMapper.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import type { IImageService } from "../interfaces/services/IImageService.js";
import { TrainerStatus } from "../constants/TrainerStatus.js";

@injectable()
export class TrainerOnboardingService implements ITrainerOnboardingService{
constructor(@inject(TOKENS.ITrainerRepository) private trainerRepository:ITrainerRepository, @inject(TOKENS.IImageService) private imageService:IImageService)
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
    return this.trainerRepository.save(trainer)
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
            type: file.originalname.toLowerCase().includes('cert') ? 'CERTIFICATE' : 'ID',
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