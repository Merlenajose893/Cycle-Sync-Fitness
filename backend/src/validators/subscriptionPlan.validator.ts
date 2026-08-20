import { z } from "zod";

export const createSubscriptionPlanSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  code: z.string().min(2, "Code must be at least 2 characters").max(50),
  tier: z.enum(["basic", "premium", "elite"]),
  price: z.number().min(0, "Price must be non-negative"),
  currency: z.string().optional().default("INR"),
  billingCycle: z.enum(["monthly", "annual"]),
  features: z.object({
    aiPlanGeneration: z.boolean().default(false),
    unlimitedFoodTracking: z.boolean().default(false),
    trainerMatching: z.boolean().default(false),
    cycleSyncInsights: z.boolean().default(false),
    maxDailyFoodLogs: z.number().min(0).default(5),
  }),
});

export const updateSubscriptionPlanSchema = createSubscriptionPlanSchema.partial();
