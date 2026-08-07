import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import { CycleLog, type ICycleLog } from "../models/CycleLog.js";
import { BaseRepository } from "./BaseRepository.js";

export class CycleLogRepository extends BaseRepository<ICycleLog> implements ICycleLogRepository{
    constructor()
    {
        super(CycleLog)
    }

    findByUser(userId: string): Promise<ICycleLog[]> {
        return this.model.find({userId}).sort({startDate:-1});
    }
    findByLatest(userId: string): Promise<ICycleLog | null> {
        return this.model.findOne({userId})
    }
    findRecentCycles(userId: string, limit: number): Promise<ICycleLog[]> {
        return this.model.find({userId}).sort({startDate:-1}).limit(limit)
    }
}