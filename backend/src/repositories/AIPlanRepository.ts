import { injectable } from "tsyringe";
import { PlanStatus } from "../constants/aiPlan.js";
import type { IAIPlanRepository } from "../interfaces/repositories/IAIPlanRepository.js";
import AIPlan, { type IAIPlan } from "../models/AIPlan.js";
import { BaseRepository } from "./BaseRepository.js";

@injectable()
export class AIPlanRepository
  extends BaseRepository<IAIPlan>
  implements IAIPlanRepository
{
  constructor() {
    super(AIPlan);
  }

  async findActivePlan(userId: string): Promise<IAIPlan | null> {
    return this.model.findOne({
      userId,
      status: PlanStatus.ACTIVE,
    });
  }

  async findAllByUserId(userId: string): Promise<IAIPlan[]> {
    return this.model
      .find({ userId })
      .sort({ createdAt: -1 });
  }

  async updateStatus(
    planId: string,
    status: PlanStatus
  ): Promise<IAIPlan | null> {
    return this.model.findByIdAndUpdate(
      planId,
      { status },
      { new: true }
    );
  }

  async archiveActivePlans(userId: string): Promise<void> {
    await this.model.updateMany(
      {
        userId,
        status: PlanStatus.ACTIVE,
      },
      {
        status: PlanStatus.ARCHIVED,
      }
    );
  }
}