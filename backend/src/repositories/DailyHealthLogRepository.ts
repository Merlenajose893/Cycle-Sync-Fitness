import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import { DailyHealthLog, type IDailyHealthLog } from "../models/DailyHealthLog.js";
import { BaseRepository } from "./BaseRepository.js";

export class DailyHealthLogRepository extends BaseRepository<IDailyHealthLog> implements IDailyHealthLogRepository{
    constructor()
    {
        super(DailyHealthLog)
    }
    findByDate(userId: string, date: Date): Promise<IDailyHealthLog | null> {
        return this.model.findOne({userId,date})
    }
    findHistory(userId: string): Promise<IDailyHealthLog[]> {
        return this.model.find({userId}).sort({date:-1})
    }
}