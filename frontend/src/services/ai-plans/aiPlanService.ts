import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { AIPlan, AIPlanInputs, PlanStatus } from "../../types/aiplan.types";

export const aiPlanService = {
    generatePlan: async (input: AIPlanInputs): Promise<AIPlan> => {
        const response = await axiosInstance.post(API_ENDPOINTS.AI_PLAN.GENERATE, input);
        return response.data.data;
    },
    createDraftPlan: async (input: AIPlanInputs): Promise<AIPlan> => {
        const response = await axiosInstance.post(API_ENDPOINTS.AI_PLAN.DRAFT, input);
        return response.data.data;
    },
    getActivePlan: async (): Promise<AIPlan> => {
        const response = await axiosInstance.get(API_ENDPOINTS.AI_PLAN.ACTIVE);
        return response.data.data;
    },
    getPlanHistory: async (): Promise<AIPlan[]> => {
        const response = await axiosInstance.get(API_ENDPOINTS.AI_PLAN.HISTORY);
        return response.data.data;
    },
    updatePlanStatus: async (planId: string, status: PlanStatus): Promise<AIPlan> => {
        const response = await axiosInstance.patch(API_ENDPOINTS.AI_PLAN.STATUS(planId), { status });
        return response.data.data;
    },
    editPlan: async (planId: string, updates: Partial<AIPlan>): Promise<AIPlan> => {
        const response = await axiosInstance.patch(API_ENDPOINTS.AI_PLAN.EDIT(planId), updates);
        return response.data.data;
    },
    deletePlan: async (planId: string): Promise<void> => {
        const response = await axiosInstance.delete(API_ENDPOINTS.AI_PLAN.DELETE(planId));
        return response.data.data;
    }
};