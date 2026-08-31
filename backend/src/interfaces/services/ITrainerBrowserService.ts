import type { ITrainer } from "../../models/Trainer.ts";

export interface ITrainerBrowserService{
    getApprovedTrainers():Promise<ITrainer[]>;
    getTrainerProfile(trainerId:string):Promise<ITrainer|null>;
}