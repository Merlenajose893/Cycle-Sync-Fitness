import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import { type IDailyHealthLog } from "../models/DailyHealthLog.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class DailyHealthLogRepository extends BaseRepository<IDailyHealthLog> implements IDailyHealthLogRepository {
    constructor();
    findByDate(userId: string, date: Date): Promise<IDailyHealthLog | null>;
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<IDailyHealthLog[]>;
    findHistory(userId: string): Promise<IDailyHealthLog[]>;
    upsertByDate(userId: string, date: Date, data: Partial<IDailyHealthLog>): Promise<IDailyHealthLog>;
    countByUser(userId: string): Promise<number>;
}
//# sourceMappingURL=DailyHealthLogRepository.d.ts.map