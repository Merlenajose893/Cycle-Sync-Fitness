import { injectable } from "tsyringe";
import { HealthMilestoneType } from "../constants/health.constant.js";
import type { IHealthMilestoneRepository } from "../interfaces/repositories/IHealthMilestoneRepository.js";
import { HealthMilestone, type IHealthMilestone } from "../models/HealthMilestone.js";
import { BaseRepository } from "./BaseRepository.js";

@injectable()
export class HealthMilestoneRepository extends BaseRepository<IHealthMilestone> implements IHealthMilestoneRepository{

    constructor()
    {
        super(HealthMilestone)
    }
    findByUser(userId: string): Promise<IHealthMilestone[]> {
        return this.model.find({userId}).sort({achievedAt:-1})
    }
    async hasMileStone(userId: string, milestone: HealthMilestoneType): Promise<boolean> {
        const doc = await this.model.findOne({ userId, milestone });
        return !!doc;
    }
}