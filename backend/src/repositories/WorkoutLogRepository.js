import { WorkoutLog } from "../models/WorkoutLog.js";
import { BaseRepository } from "./BaseRepository.js";
export class WorkoutLogRepository extends BaseRepository {
    constructor() {
        super(WorkoutLog);
    }
    findByUserAndDate(userId, date) {
        return this.model.findOne({ userId, date });
    }
    findByUserDateRange(userId, startDate, endDate) {
        return this.model.find({ userId, date: { $gte: startDate, $lte: endDate } });
    }
    getExerciseHistory(userId, exerciseName, limit) {
        return this.model.find({ userId, "exercises.exerciseName": exerciseName }).sort({ createdAt: -1 });
    }
    findByUser(userId, page, limit) {
        const skip = (page - 1) * limit;
        return this.model.find({ userId }).sort({ date: -1 }).skip(skip).limit(limit);
    }
    countByUser(userId) {
        return this.model.countDocuments({ userId });
    }
}
//# sourceMappingURL=WorkoutLogRepository.js.map