import { injectable } from "tsyringe";
import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.ts";
import { CycleLog, type ICycleLog } from "../models/CycleLog.ts";
import { BaseRepository } from "./BaseRepository.ts";

@injectable()
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
    countByUser(userId: string): Promise<number> {
        return this.model.countDocuments({userId})
    }
}