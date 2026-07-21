import { useState } from "react";
import { aiPlanService } from "../../services/aiplan/aiPlanService";
import type { AIPlan, AIPlanInputs, PlanStatus } from "../../types/aiplan.types";
import axios from "axios";

export const useAIPlan = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generatePlan = async (inputs: AIPlanInputs): Promise<AIPlan | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.generatePlan(inputs);
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to generate plan");
            } else {
                setError("Unexpected error");
            }
        } finally {
            setLoading(false);
        }
    };

    const getActivePlan = async (): Promise<AIPlan | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.getActivePlan();
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to fetch active plan");
            } else {
                setError("Unexpected error");
            }
        } finally {
            setLoading(false);
        }
    };

    const getPlanHistory = async (): Promise<AIPlan[] | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.getPlanHistory();
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to fetch plan history");
            } else {
                setError("Unexpected error");
            }
        } finally {
            setLoading(false);
        }
    };

    const updatePlanStatus = async (planId: string, status: PlanStatus): Promise<AIPlan | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.updatePlanStatus(planId, status);
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to update plan status");
            } else {
                setError("Unexpected error");
            }
        } finally {
            setLoading(false);
        }
    };

    const deletePlan = async (planId: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await aiPlanService.deletePlan(planId);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to delete plan");
            } else {
                setError("Unexpected error");
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, generatePlan, getActivePlan, getPlanHistory, updatePlanStatus, deletePlan };
};
