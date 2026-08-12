import { inject, injectable } from "tsyringe";
import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.js";
import { MealLog, type IMealLog } from "../models/MealLog.js";
import { BaseRepository } from "./BaseRepository.js";
@injectable()
export class MealLogRepository extends BaseRepository<IMealLog> implements IMealLogRepository{


    constructor()
    {
        super (MealLog);
    }
findByUserAndDate(userId: string, date: Date): Promise<IMealLog | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.model.findOne({
        userId,
        date: { $gte: startOfDay, $lte: endOfDay }
    });
}
findByUserDateRange(userId: string, startDate: Date, endDate: Date): Promise<IMealLog[]> {
    return this.model.find({userId,date:{$gte:startDate,$lte:endDate}}).sort({date:1});
}
}