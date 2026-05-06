import type { ITrainer } from "../../models/Trainer.js";

export interface ITrainerRepository{
    findById(id:string):Promise<ITrainer|null>,
    findByEmail(email:string):Promise<ITrainer|null>
    create(data:Partial<ITrainer>):Promise<ITrainer|null>
    save(trainer:ITrainer):Promise<ITrainer>
}