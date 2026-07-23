import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.js";
import { MealLog, type IMealLog } from "../models/MealLog.js";
import { BaseRepository } from "./BaseRepository.js";
import { Model } from "mongoose";
export class MealLogRepository extends BaseRepository<IMealLog> implements IMealLogRepository{


    constructor()
    {
        super (MealLog);
    }
findByUserAndDate(userId: string, date: Date): Promise<IMealLog | null> {
return this.model.findOne({userId,date})

    
}
findByUserDateRange(userId: string, startDate: Date, endDate: Date): Promise<IMealLog[]> {
    
}
}