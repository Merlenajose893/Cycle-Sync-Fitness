import { HealthMilestoneType } from "../constants/health.constant.js";
import { HealthMilestone } from "../models/HealthMilestone.js";
import { BaseRepository } from "./BaseRepository.js";
export class HealthMilestoneRepository extends BaseRepository {
    constructor() {
        super(HealthMilestone);
    }
    findByUser(userId) {
        return this.model.find({ userId }).sort({ achievedAt: -1 });
    }
    async hasMileStone(userId, milestone) {
        const doc = await this.model.findOne({ userId, milestone });
        return !!doc;
    }
}
//# sourceMappingURL=HealthMilestoneRepository.js.map