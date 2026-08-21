import { injectable } from "tsyringe";
import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import { DailyHealthLog, type IDailyHealthLog } from "../models/DailyHealthLog.js";
import { BaseRepository } from "./BaseRepository.js";

@injectable()
export class DailyHealthLogRepository extends BaseRepository<IDailyHealthLog> implements IDailyHealthLogRepository{
    constructor()
    {
        super(DailyHealthLog)
    }
    findByDate(userId: string, date: Date): Promise<IDailyHealthLog | null> {
        return this.model.findOne({userId,date})
    }
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<IDailyHealthLog[]> {
        return this.model.find({userId,date:{$gte:startDate,$lte:endDate}})
    }
    findHistory(userId: string): Promise<IDailyHealthLog[]> {
        return this.model.find({userId}).sort({date:-1})
    }
    upsertByDate(userId: string, date: Date, data: Partial<IDailyHealthLog>): Promise<IDailyHealthLog> {
        return this.model.findOneAndUpdate({userId,date},data,{upsert:true,new:true})
    }
    countByUser(userId: string): Promise<number> {
        return this.model.countDocuments({userId})
    }
}