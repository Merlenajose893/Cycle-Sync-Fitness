import { useState } from "react";
import axios from "axios";
import type { updateBodyDetailsDTO, updateCycleSetUpDTO, updateGoalsDTO, useronboardingStatus } from "../../types/useronboarding.types";
import { userOnboardingService } from "../../services/onboarding/useronboardingService";
import { ONBOARDING_MESSAGES, COMMON_MESSAGES } from "../../constants/messages";

export const useUserOnboarding = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getOnboardingStatus = async (): Promise<useronboardingStatus> => {
        try {
            setLoading(true);
            setError(null);
            const response = await userOnboardingService.getOnboardingStatus();
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? ONBOARDING_MESSAGES.FETCH_STATUS_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateBodyDetails = async (data: updateBodyDetailsDTO) => {
        try {
            setLoading(true);
            setError(null);
            await userOnboardingService.updateBodyDetails(data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? ONBOARDING_MESSAGES.UPDATE_BODY_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
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
                setError(error.response?.data?.message ?? ONBOARDING_MESSAGES.UPDATE_CYCLE_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateGoals = async (data: updateGoalsDTO) => {
        try {
            setLoading(true);
            setError(null);
            await userOnboardingService.updateGoals(data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? ONBOARDING_MESSAGES.UPDATE_GOALS_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const completeOnboarding = async () => {
        try {
            setLoading(true);
            setError(null);
            return await userOnboardingService.completeOnboarding();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ?? ONBOARDING_MESSAGES.COMPLETE_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, getOnboardingStatus, updateBodyDetails, updateCycleSetUp, updateGoals, completeOnboarding };
};