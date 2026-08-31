import { inject, injectable } from "tsyringe";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.ts";
import type { ITrainerBrowserService } from "../interfaces/services/ITrainerBrowserService.ts";
import type { ITrainer } from "../models/Trainer.ts";
import { TOKENS } from "../container/tokens.ts";
import { NotFoundError } from "../errors/index.ts";
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