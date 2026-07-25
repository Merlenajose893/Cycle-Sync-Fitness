import { HealthMilestoneType } from "../constants/health.constant.js";
import type { IHealthMilestoneRepository } from "../interfaces/repositories/IHealthMilestoneRepository.js";
import { HealthMilestone, type IHealthMilestone } from "../models/HealthMilestone.js";
import { BaseRepository } from "./BaseRepository.js";

export class HealthMilestoneRepository extends BaseRepository<IHealthMilestone> implements IHealthMilestoneRepository{

    constructor()
    {
        super(HealthMilestone)
    }
    findByUser(userId: string): Promise<IHealthMilestone[]> {
        return this.model.find({userId}).sort({achievedAt:-1})
    }
    hasMileStone(userId: string, milestone: HealthMilestoneType): Promise<boolean> {
        return this.model.findOne(userId,milestone:HealthMilestoneType)
    }
}