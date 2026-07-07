import { useState } from "react";
import axios from "axios";

import {
    trainerAuthService
} from "../../services/auth/trainerAuthService";

import type {
    RegisterTrainerInviteDTO,
    VerifyTrainerInviteResponse
} from "../../types/trainer.types";

export const useTrainerInvite = () => {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const verifyInvite = async (
        token: string
    ): Promise<VerifyTrainerInviteResponse> => {

        setLoading(true);
        setError(null);

        try {

            const data =
                await trainerAuthService.verifyTrainerInvite(token);

            return data;

        } catch (error: unknown) {

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ??
                    "Trainer invitation verification failed."
                );
            } else {
                setError("Something went wrong.");
            }

            throw error;

        } finally {
            setLoading(false);
        }

    };

    const registerFromInvite = async (
        data: RegisterTrainerInviteDTO
    ) => {

        setLoading(true);
        setError(null);

        try {

            return await trainerAuthService.registerTrainerInvite(data);

        } catch (error: unknown) {

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data.message ??
                    "Registration failed."
                );
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
        verifyInvite,
        registerFromInvite
    };
};