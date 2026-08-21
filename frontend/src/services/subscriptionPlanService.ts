import axiosInstance from "../api/axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export interface ISubscriptionPlanFrontend {
  _id: string;
  name: string;
  code: string;
  tier: "basic" | "premium" | "elite";
  price: number;
  currency: string;
  billingCycle: "monthly" | "annual";
  features: {
    aiPlanGeneration: boolean;
    unlimitedFoodTracking: boolean;
    trainerMatching: boolean;
    cycleSyncInsights: boolean;
    maxDailyFoodLogs: number;
  };
  isActive: boolean;
}

export interface CreateSubscriptionPlanInput {
  name: string;
  code: string;
  tier: "basic" | "premium" | "elite";
  price: number;
  currency?: string;
  billingCycle: "monthly" | "annual";
  features: {
    aiPlanGeneration: boolean;
    unlimitedFoodTracking: boolean;
    trainerMatching: boolean;
    cycleSyncInsights: boolean;
    maxDailyFoodLogs: number;
  };
}

export const subscriptionPlanService = {
  async getActivePlans(): Promise<ISubscriptionPlanFrontend[]> {
    const response = await axiosInstance.get(API_ENDPOINTS.SUBSCRIPTION_PLANS.ACTIVE);
    return response.data.data;
  },

  async getAllPlans(): Promise<ISubscriptionPlanFrontend[]> {
    const response = await axiosInstance.get(API_ENDPOINTS.SUBSCRIPTION_PLANS.ALL);
    return response.data.data;
  },

  async createPlan(data: CreateSubscriptionPlanInput): Promise<ISubscriptionPlanFrontend> {
    const response = await axiosInstance.post(API_ENDPOINTS.SUBSCRIPTION_PLANS.ALL, data);
    return response.data.data;
  },

  async updatePlan(id: string, data: Partial<CreateSubscriptionPlanInput>): Promise<ISubscriptionPlanFrontend> {
    const response = await axiosInstance.put(API_ENDPOINTS.SUBSCRIPTION_PLANS.BY_ID(id), data);
    return response.data.data;
  },

  async deactivatePlan(id: string): Promise<ISubscriptionPlanFrontend> {
    const response = await axiosInstance.patch(API_ENDPOINTS.SUBSCRIPTION_PLANS.DEACTIVATE(id));
    return response.data.data;
  },

  async createSubscriptionCheckout(planId: string): Promise<{ checkoutUrl: string; sessionId: string }> {
    const response = await axiosInstance.post(API_ENDPOINTS.PAYMENT.SUBSCRIPTION_CHECKOUT, { planId });
    return response.data.data;
  },
};
