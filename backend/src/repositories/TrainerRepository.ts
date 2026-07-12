import { injectable } from "tsyringe";
import { TrainerModel } from "../models/Trainer.js";

import type { ITrainer } from "../models/Trainer.js";
import type { ITrainerRepository } from "../interfaces/repositories/ITrainerRepository.js";
import { BaseRepository } from "./BaseRepository.js";
import { TrainerStatus } from "../constants/TrainerStatus.js";
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

    async findByInviteToken(token: string): Promise<ITrainer | null> {
        return this.model.findOne({inviteToken:token})
    }
    async updateTrainerInvite(trainerId: string, inviteToken: string, inviteExpiresAt: Date): Promise<ITrainer | null> {
        return this.model.findByIdAndUpdate(trainerId,{inviteToken,inviteExpiresAt,inviteAccepted:false},{new:true});
    }

    async acceptTrainer(trainerId: string, hashedPassword: string): Promise<ITrainer | null> {
        return this.model.findByIdAndUpdate(trainerId,{password:hashedPassword,inviteToken:null,inviteExpiresAt:null,inviteAccepted:true},{new:true})
    }

    async findByStatus(status: TrainerStatus): Promise<ITrainer[]> {
        return this.model.find({status})
    }
}