import { TrainerModel } from "../models/Trainer.js";
import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
export class TrainerRepository implements ITrainerRepository {
    async findByEmail(email:string)
    {
        return TrainerModel.findOne({email})
    }

    async create(trainerDetail:Partial<ITrainer>):Promise<ITrainer>{
        return TrainerModel.create(trainerDetail)
    }

    async save(trainer:ITrainer)
    {
        return trainer.save();
    }

    async findById(id: string): Promise<ITrainer | null> {
        return TrainerModel.findById(id)
    }
}