import { inject,injectable } from "tsyringe";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerOnboardingService } from "../interfaces/services/ITrainerOnboardingService.js";
import { TOKENS } from "../container/tokens.js";
import type { UpdateTrainerProfileDTO,UpdateTrainerCertificateDTO,UpdateTrainerPackageDTO } from "../dtos/traineronboarding.dto.js";
import { TrainerOnboardingMapper } from "../mappers/TrainerOnboardingMapper.js";
import { NotFoundError } from "../errors/index.js";
import type { IImageService } from "../interfaces/services/IImageService.js";

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
    trainer.onboardingCompleted=true;
    return this.trainerRepository.save(trainer);
}
}