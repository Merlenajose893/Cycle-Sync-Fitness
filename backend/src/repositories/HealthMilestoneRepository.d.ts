import { HealthMilestoneType } from "../constants/health.constant.js";
import type { IHealthMilestoneRepository } from "../interfaces/repositories/IHealthMilestoneRepository.js";
import { type IHealthMilestone } from "../models/HealthMilestone.js";
import { BaseRepository } from "./BaseRepository.js";
export declare class HealthMilestoneRepository extends BaseRepository<IHealthMilestone> implements IHealthMilestoneRepository {
    constructor();
    findByUser(userId: string): Promise<IHealthMilestone[]>;
    hasMileStone(userId: string, milestone: HealthMilestoneType): Promise<boolean>;
}
//# sourceMappingURL=HealthMilestoneRepository.d.ts.map