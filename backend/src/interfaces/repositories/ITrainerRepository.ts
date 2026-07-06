import type { ITrainer } from "../../models/Trainer.js";
import type { IBaseRepository } from "./IBaseRepository.js";
export interface  ITrainerRepository extends IBaseRepository<ITrainer>{

    findByEmail(email:string):Promise<ITrainer|null>;
    blockTrainer(trainerId:string):Promise<ITrainer|null>;
    unblockTrainer(trainerId:string):Promise<ITrainer|null>;
    
}