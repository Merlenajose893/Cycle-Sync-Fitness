import { inject, injectable } from "tsyringe";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import type { ITrainerBrowserService } from "../interfaces/services/ITrainerBrowserService.js";
import type { ITrainer } from "../models/Trainer.js";
import { TOKENS } from "../container/tokens.js";
import { NotFoundError } from "../errors/index.js";
@injectable()
export class TrainerBrowserService implements ITrainerBrowserService{
    constructor(@inject(TOKENS.ITrainerRepository)private trainerrepository:ITrainerRepository)
    {

    }
    getApprovedTrainers=async(): Promise<ITrainer[]> =>{
        const trainer=await this.trainerrepository.findApprovedTrainers();
        return trainer;
    }
    getTrainerProfile=async (trainerId: string): Promise<ITrainer | null> =>{
        const trainer=await this.trainerrepository.findById(trainerId);
        if(!trainer)
        {
            throw new NotFoundError("Trainer Not Found")
        }
        // Strip sensitive fields before returning to public API
        const { password, inviteToken, inviteExpiresAt, inviteAccepted, isDeleted, ...safeTrainer } = trainer.toObject();
        return safeTrainer as ITrainer;
    }
}