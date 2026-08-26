import { useState } from "react";
import axios from "axios";
import type { 
    UpdateTrainerProfileDTO,
    UpdateTrainerCertificateDTO,
    UpdateTrainerPackageDTO,
    TrainerOnboardingStatus 
} from "../../types/traineronboarding.types";
import { traineronboardingService } from "../../services/onboarding/traineronboardingService";

export const useTrainerOnboarding = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getOnboardingStatus = async (): Promise<TrainerOnboardingStatus | null> => {
        try {
            setLoading(true);
            setError(null);
            const response = await traineronboardingService.getOnboardingStatus();
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch status");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data: UpdateTrainerProfileDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await traineronboardingService.updateTrainerProfile(data);
            console.log(response);
            
            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateCertifications = async (data: UpdateTrainerCertificateDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await traineronboardingService.updateTrainerCertifications(data);
            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update certifications");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePackages = async (data: UpdateTrainerPackageDTO) => {
        try {
            setLoading(true);
            setError(null);
            const response = await traineronboardingService.updateTrainerPackages(data);
            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update packages");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const completeOnboarding = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await traineronboardingService.completeOnboarding();
            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to complete onboarding");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const uploadAvatar = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
        const response =
            await traineronboardingService.uploadAvatar(file);

        return response;

    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            setError(
                error.response?.data.message ??
                "Avatar upload failed."
            );
        } else {
            setError("Something went wrong.");
        }

        throw error;

    } finally {
        setLoading(false);
    }

};

    const uploadDocuments = async (files: File[]) => {
        setLoading(true);
        setError(null);

        try {
            const response = await traineronboardingService.uploadDocuments(files);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message ?? "Document upload failed.");
            } else {
                setError("Something went wrong.");
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getOnboardingStatus,
        updateProfile,
        updateCertifications,
        updatePackages,
        completeOnboarding,
        uploadAvatar,
        uploadDocuments
    };
};

