import type { IHealthMilestoneRepository } from "../interfaces/repositories/IHealthMilestoneRepository.js";
import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import type { IHealthMilestoneService } from "../interfaces/services/IHealthMilestoneService.js";
import type { IHealthMilestone } from "../models/HealthMilestone.js";
export declare class HealthMilestoneService implements IHealthMilestoneService {
    private milestoneRepository;
    private cycleLogRepository;
    private dailyHealthLogRepository;
    constructor(milestoneRepository: IHealthMilestoneRepository, cycleLogRepository: ICycleLogRepository, dailyHealthLogRepository: IDailyHealthLogRepository);
    getUserMilestones(userId: string): Promise<IHealthMilestone[]>;
    checkAndAwardMilestones(userId: string): Promise<IHealthMilestone[]>;
}
//# sourceMappingURL=HealthMilestoneService.d.ts.map