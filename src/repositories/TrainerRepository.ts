import { TrainerModel } from "../models/Trainer.js";
import type { ITrainer } from "../models/Trainer.js";

export class TrainerRepository{
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
}