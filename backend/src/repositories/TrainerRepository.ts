import { injectable } from "tsyringe";
import { TrainerModel } from "../models/Trainer.js";

import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import { BaseRepository } from "./BaseRepository.js";
// import { tr } from "zod/locales";
@injectable()
export class TrainerRepository extends BaseRepository<ITrainer> implements ITrainerRepository {
    constructor()
    {
        super(TrainerModel)
    }
    async findByEmail(email:string):Promise<ITrainer|null>
    {
        return this.model.findOne({email})
    }

    async blockTrainer(trainerId: string): Promise<ITrainer | null> {
        return this.model.findByIdAndUpdate(trainerId,{isDeleted:true},{new:true})
    }

    async unblockTrainer(trainerId: string): Promise<ITrainer | null> {
        return this.model.findByIdAndUpdate(trainerId,{isDeleted:false},{new :true})
    }
    
}