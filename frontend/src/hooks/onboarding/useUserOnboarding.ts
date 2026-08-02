import { useState } from "react";
import axios from "axios";
import type { updateBodyDetailsDTO, updateCycleSetUpDTO, updateGoalsDTO, useronboardingStatus } from "../../types/useronboarding.types";
import { userOnboardingService } from "../../services/onboarding/useronboardingService";
import { parseErrorMessage } from "../../utils/errorParser";

export const useUserOnboarding = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getOnboardingStatus = async (): Promise<useronboardingStatus> => {
        try {
            setLoading(true)
            setError(null)
            const response = await userOnboardingService.getOnboardingStatus();
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? "Failed to fetch onboarding status")

            }
            else {
                setError("Unexpected error occured");
            }
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    const updateBodyDetails = async (data: updateBodyDetailsDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await userOnboardingService.updateBodyDetails(data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? "Failed to update Body details")
            }
            else {
                setError("Unexpected error occured")
            }
            throw error;
        }

        finally {
            setLoading(false);
        }
    };

    const updateCycleSetUp = async (data: updateCycleSetUpDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await userOnboardingService.updateCycleSetUp(data);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? "Failed to update cycel setup");
            }
            else {
                setError("Unexpected error occured");
            }
            throw error;
        }
        finally {
            setLoading(false);
        }
    };

    const updateGoals = async (data: updateGoalsDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await userOnboardingService.updateGoals(data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message ?? "Failed to update Goals");
            }
            else {
                setError("Unexpected error occured")
            }
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    const completeOnboarding = async () => {
        try {
            setLoading(true);
            setError(null);
            return await userOnboardingService.completeOnboarding();

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message ?? "Failed to complete onboarding")
            }
            else {
                setError("Unexpected Error");
            }
            throw error;

        }

        finally {
            setLoading(false)
        }
    };

    return { loading, error, getOnboardingStatus, updateBodyDetails, updateCycleSetUp, updateGoals, completeOnboarding }
}