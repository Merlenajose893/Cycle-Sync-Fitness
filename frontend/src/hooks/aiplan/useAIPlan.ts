import { useState, useCallback } from "react";
import { aiPlanService } from "../../services/aiplan/aiPlanService";
import type { AIPlan, AIPlanInputs, PlanStatus } from "../../types/aiplan.types";
import axios from "axios";

export const useAIPlan = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generatePlan = useCallback(async (inputs: AIPlanInputs): Promise<AIPlan | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.generatePlan(inputs);
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to generate plan");
                throw error;
            } else {
                setError("Unexpected error");
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const getActivePlan = useCallback(async (): Promise<AIPlan | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.getActivePlan();
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to fetch active plan");
                throw error;
            } else {
                setError("Unexpected error");
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const getPlanHistory = useCallback(async (): Promise<AIPlan[] | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.getPlanHistory();
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to fetch plan history");
                throw error;
            } else {
                setError("Unexpected error");
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePlanStatus = useCallback(async (planId: string, status: PlanStatus): Promise<AIPlan | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const result = await aiPlanService.updatePlanStatus(planId, status);
            return result;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to update plan status");
                throw error;
            } else {
                setError("Unexpected error");
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const deletePlan = useCallback(async (planId: string): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            await aiPlanService.deletePlan(planId);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || "Failed to delete plan");
                throw error;
            } else {
                setError("Unexpected error");
                throw error;
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, generatePlan, getActivePlan, getPlanHistory, updatePlanStatus, deletePlan };
};
