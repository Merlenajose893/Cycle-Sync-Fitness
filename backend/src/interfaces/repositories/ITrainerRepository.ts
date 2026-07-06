import type { ITrainer } from "../../models/Trainer.js";
import type { IBaseRepository } from "./IBaseRepository.js";
export interface  ITrainerRepository extends IBaseRepository<ITrainer>{

    findByEmail(email:string):Promise<ITrainer|null>;
    blockTrainer(trainerId:string):Promise<ITrainer|null>;
    unblockTrainer(trainerId:string):Promise<ITrainer|null>;
    findByInviteToken(token:string):Promise<ITrainer|null>;
    updateTrainerInvite(trainerId:string,inviteToken:string,inviteExpiresAt:Date):Promise<ITrainer|null>;
    acceptTrainer(trainerId:string,hashedPassword:string):Promise<ITrainer|null>
    
}