import { injectable } from "tsyringe";
import { HealthMilestoneType } from "../constants/health.constant.ts";
import type { IHealthMilestoneRepository } from "../interfaces/repositories/IHealthMilestoneRepository.ts";
import { HealthMilestone, type IHealthMilestone } from "../models/HealthMilestone.ts";
import { BaseRepository } from "./BaseRepository.ts";

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