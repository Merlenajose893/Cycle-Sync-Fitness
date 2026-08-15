import { DailyHealthLog } from "../models/DailyHealthLog.js";
import { BaseRepository } from "./BaseRepository.js";
export class DailyHealthLogRepository extends BaseRepository {
    constructor() {
        super(DailyHealthLog);
    }
    findByDate(userId, date) {
        return this.model.findOne({ userId, date });
    }
    findByDateRange(userId, startDate, endDate) {
        return this.model.find({ userId, date: { $gte: startDate, $lte: endDate } });
    }
    findHistory(userId) {
        return this.model.find({ userId }).sort({ date: -1 });
    }
    upsertByDate(userId, date, data) {
        return this.model.findOneAndUpdate({ userId, date }, data, { upsert: true, new: true });
    }
    countByUser(userId) {
        return this.model.countDocuments({ userId });
    }
}
//# sourceMappingURL=DailyHealthLogRepository.js.map