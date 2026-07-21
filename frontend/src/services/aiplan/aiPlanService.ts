import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { AIPlan, AIPlanInputs, PlanStatus } from "../../types/aiplan.types";

export const aiPlanService = {
    async generatePlan(inputs: AIPlanInputs): Promise<AIPlan> {
        const response = await axiosInstance.post(
            API_ENDPOINTS.AI_PLAN.GENERATE,
            inputs
        );
        return response.data.data;
    },

    async getActivePlan(): Promise<AIPlan> {
        const response = await axiosInstance.get(
            API_ENDPOINTS.AI_PLAN.ACTIVE
        );
        return response.data.data;
    },

    async getPlanHistory(): Promise<AIPlan[]> {
        const response = await axiosInstance.get(
            API_ENDPOINTS.AI_PLAN.HISTORY
        );
        return response.data.data;
    },

    async updatePlanStatus(planId: string, status: PlanStatus): Promise<AIPlan> {
        const response = await axiosInstance.patch(
            API_ENDPOINTS.AI_PLAN.STATUS(planId),
            { status }
        );
        return response.data.data;
    },

    async deletePlan(planId: string): Promise<void> {
        await axiosInstance.delete(
            API_ENDPOINTS.AI_PLAN.DELETE(planId)
        );
    },
};
