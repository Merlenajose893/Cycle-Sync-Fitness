import { CycleLog } from "../models/CycleLog.js";
import { BaseRepository } from "./BaseRepository.js";
export class CycleLogRepository extends BaseRepository {
    constructor() {
        super(CycleLog);
    }
    findByUser(userId) {
        return this.model.find({ userId }).sort({ startDate: -1 });
    }
    findByLatest(userId) {
        return this.model.findOne({ userId });
    }
    findRecentCycles(userId, limit) {
        return this.model.find({ userId }).sort({ startDate: -1 }).limit(limit);
    }
    countByUser(userId) {
        return this.model.countDocuments({ userId });
    }
}
//# sourceMappingURL=CycleLogRepository.js.map