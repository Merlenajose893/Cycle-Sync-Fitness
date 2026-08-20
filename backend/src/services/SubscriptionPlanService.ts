import { injectable, inject } from "tsyringe";

import type {
  CreateSubscriptionPlanDTO,
  UpdateSubscriptionPlanDTO,
} from "../dtos/subscriptionPlandto.js";

import type { ISubscriptionPlan } from "../models/SubscriptionPlan.js";
import type { ISubscriptionPlanRepository } from "../interfaces/repositories/ISubscriptionplanRepository.js";
import type { IStripeBillingGateway } from "../interfaces/gateways/IStripeBillingGateway.js";
import { TOKENS } from "../container/tokens.js";
import type { ISubscriptionPlanService } from "../interfaces/services/ISubscriptionPlanService.js";
import { ConflictError } from "../errors/index.js";

@injectable()
export class SubscriptionPlanService
  implements ISubscriptionPlanService
{
  constructor(
    @inject(TOKENS.ISubscriptionPlanRepository)
    private readonly subscriptionPlanRepository: ISubscriptionPlanRepository,

    @inject(TOKENS.IStripeBillingGateway)
    private readonly stripeBillingGateway: IStripeBillingGateway
  ) {}

  async createPlan(
    data: CreateSubscriptionPlanDTO
  ): Promise<ISubscriptionPlan> {
    const existingPlan =
      await this.subscriptionPlanRepository.findByCode(data.code);

    if (existingPlan) {
      throw new ConflictError("Subscription plan code already exists");
    }

    const interval =
      data.billingCycle === "monthly"
        ? "month"
        : "year";

    const stripeData =
      await this.stripeBillingGateway.createProductAndPrice(
        data.name,
        data.price,
        data.currency ?? "INR",
        interval
      );

    const plan =
      await this.subscriptionPlanRepository.create({
        ...data,
        currency: data.currency ?? "INR",
        stripeProductId: stripeData.stripeProductId,
        stripePriceId: stripeData.stripePriceId,
        isActive: true,
      });

    return plan;
  }

  async getPlanById(
    id: string
  ): Promise<ISubscriptionPlan | null> {
    return await this.subscriptionPlanRepository.findById(id);
  }

  async getPlanByCode(
    code: string
  ): Promise<ISubscriptionPlan | null> {
    return await this.subscriptionPlanRepository.findByCode(code);
  }

  async getActivePlans(): Promise<ISubscriptionPlan[]> {
    return await this.subscriptionPlanRepository.findAllActive();
  }

  async getAllPlans(): Promise<ISubscriptionPlan[]> {
    return await this.subscriptionPlanRepository.findAll();
  }

  async updatePlan(
    id: string,
    data: UpdateSubscriptionPlanDTO
  ): Promise<ISubscriptionPlan | null> {
    return await this.subscriptionPlanRepository.update(
      id,
      data
    );
  }

  async deactivatePlan(
    id: string
  ): Promise<ISubscriptionPlan | null> {
    return await this.subscriptionPlanRepository.update(
      id,
      {
        isActive: false,
      }
    );
  }
}