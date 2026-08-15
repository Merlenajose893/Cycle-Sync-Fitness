import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import { type ICycleLog } from "../models/CycleLog.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class CycleLogRepository extends BaseRepository<ICycleLog> implements ICycleLogRepository {
    constructor();
    findByUser(userId: string): Promise<ICycleLog[]>;
    findByLatest(userId: string): Promise<ICycleLog | null>;
    findRecentCycles(userId: string, limit: number): Promise<ICycleLog[]>;
    countByUser(userId: string): Promise<number>;
}
//# sourceMappingURL=CycleLogRepository.d.ts.map