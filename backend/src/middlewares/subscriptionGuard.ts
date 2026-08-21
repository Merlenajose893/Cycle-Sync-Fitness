import type { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IUserRepository } from "../interfaces/repositories/IUserRepository.js";
import type { ISubscriptionPlanRepository } from "../interfaces/repositories/ISubscriptionplanRepository.js";
import type { ISubscriptionPlan } from "../models/SubscriptionPlan.js";
import { ForbiddenError, UnauthorizedError } from "../errors/index.js";

export function requireSubscriptionFeature(feature: keyof ISubscriptionPlan["features"]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new UnauthorizedError("Authentication required");
      }

      const userRepository = container.resolve<IUserRepository>(TOKENS.IUserRepository);
      const subscriptionPlanRepository = container.resolve<ISubscriptionPlanRepository>(TOKENS.ISubscriptionPlanRepository);

      const user = await userRepository.findById(userId);
      if (!user) {
        throw new UnauthorizedError("User not found");
      }

      if (!user.subscription || user.subscription.status !== "active" || !user.subscription.planId) {
        throw new ForbiddenError(`An active subscription plan with '${String(feature)}' feature is required.`);
      }

      const plan = await subscriptionPlanRepository.findById(user.subscription.planId);
      if (!plan || !plan.isActive) {
        throw new ForbiddenError("Subscription plan inactive or not found");
      }

      const featureValue = plan.features[feature];
      if (typeof featureValue === "boolean" && !featureValue) {
        throw new ForbiddenError(`Your current plan (${plan.name}) does not include the '${String(feature)}' feature.`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
