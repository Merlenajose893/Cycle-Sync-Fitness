import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IHealthMilestoneRepository } from "../interfaces/repositories/IHealthMilestoneRepository.js";
import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import type { IDailyHealthLogRepository } from "../interfaces/repositories/IDailyHealthLogRepository.js";
import type { IHealthMilestoneService } from "../interfaces/services/IHealthMilestoneService.js";
import type { IHealthMilestone } from "../models/HealthMilestone.js";
import { HealthMilestoneType } from "../constants/health.constant.js";

@injectable()
export class HealthMilestoneService implements IHealthMilestoneService {
  constructor(
    @inject(TOKENS.IHealthMilestoneRepository)
    private milestoneRepository: IHealthMilestoneRepository,
    @inject(TOKENS.ICycleLogRepository)
    private cycleLogRepository: ICycleLogRepository,
    @inject(TOKENS.IDailyHealthLogRepository)
    private dailyHealthLogRepository: IDailyHealthLogRepository
  ) {}

  async getUserMilestones(userId: string): Promise<IHealthMilestone[]> {
    return await this.milestoneRepository.findByUser(userId);
  }

  async checkAndAwardMilestones(userId: string): Promise<IHealthMilestone[]> {
    const newlyAwarded: IHealthMilestone[] = [];

    const awardIfEligible = async (
      type: HealthMilestoneType,
      eligible: boolean,
      title: string,
      description: string,
      badgeIcon: string
    ) => {
      if (!eligible) return;
      const alreadyHas = await this.milestoneRepository.hasMileStone(userId, type);
      if (!alreadyHas) {
        const milestone = await this.milestoneRepository.create({
          userId: userId as any,
          milestoneType: type,
          title,
          description,
          badgeIcon,
          achievedAt: new Date(),
        } as Partial<IHealthMilestone>);
        newlyAwarded.push(milestone);
      }
    };

    // 1. Cycle log milestones
    const cycleCount = await this.cycleLogRepository.countByUser(userId);
    await awardIfEligible(
      HealthMilestoneType.CYCLE_LOGGED_FIRST_TIME,
      cycleCount >= 1,
      "First Cycle Logged",
      "Logged your cycle for the first time!",
      "droplet"
    );
    await awardIfEligible(
      HealthMilestoneType.CYCLE_LOGGED_3_MONTHS,
      cycleCount >= 3,
      "Cycle Tracking Veteran",
      "Successfully logged cycles over 3 months!",
      "calendar_check"
    );

    // 2. Health logging consistency
    const healthLogCount = await this.dailyHealthLogRepository.countByUser(userId);
    await awardIfEligible(
      HealthMilestoneType.CONSISTENT_LOGGER_7_DAYS,
      healthLogCount >= 7,
      "Habit Builder",
      "Logged your health daily for 7 days!",
      "flame"
    );

    // 3. Water goal milestone
    const history = await this.dailyHealthLogRepository.findHistory(userId);
    const hydratedDays = history.filter(h => (h.waterIntakeMl || 0) >= (h.waterTargetMl || 2000)).length;
    await awardIfEligible(
      HealthMilestoneType.WATER_LOGGED_7_DAYS,
      hydratedDays >= 7,
      "Hydration Hero",
      "Hit your daily water target on 7 different days!",
      "glass_water"
    );

    return newlyAwarded;
  }
}