import type { HealthMilestoneType } from "../../constants/health.constant.js";
import type { IHealthMilestone } from "../../models/HealthMilestone.js";
import type { IBaseRepository } from "./IBaseRepository.js";
export interface IHealthMilestoneRepository extends IBaseRepository<IHealthMilestone> {
    findByUser(userId: string): Promise<IHealthMilestone[]>;
    hasMileStone(userId: string, milestone: HealthMilestoneType): Promise<boolean>;
}
//# sourceMappingURL=IHealthMilestoneRepository.d.ts.map