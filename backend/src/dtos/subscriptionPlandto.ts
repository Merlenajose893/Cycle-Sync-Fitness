export interface CreateSubscriptionPlanDTO{
    name:string;
    code:string;
    tier:"basic"|"premium"|"elite";
    price:number;
    currency?:string;
    billingCycle:"monthly"|"annual";
    features: {
    aiPlanGeneration: boolean;
    unlimitedFoodTracking: boolean;
    trainerMatching: boolean;
    cycleSyncInsights: boolean;
    maxDailyFoodLogs: number;
  };
}

export interface UpdateSubscriptionPlanDTO {
  name?: string;
  price?: number;
  currency?: string;
  features?: {
    aiPlanGeneration?: boolean;
    unlimitedFoodTracking?: boolean;
    trainerMatching?: boolean;
    cycleSyncInsights?: boolean;
    maxDailyFoodLogs?: number;
  };
}