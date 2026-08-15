import { useState } from "react";
import axios from "axios";
import { trainerAuthService } from "../../services/auth/trainerAuthService";
import type { RegisterTrainerPayload, LoginTrainerPayload, VerifyTrainerOtpPayload, Trainer, ResendTrainerOTPPayload, ForgotPasswordTrainerPayload, ResetPasswordTrainerPayload } from "../../types/auth.types";
import { TRAINER_AUTH_MESSAGES, COMMON_MESSAGES } from "../../constants/messages";

export const useTrainerAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const registerTrainer = async (data: RegisterTrainerPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.registerTrainer(data);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.REGISTER_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const verifyTrainerOtp = async (data: VerifyTrainerOtpPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.verifyTrainerOtp(data);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.OTP_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async (data: ResendTrainerOTPPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.resendOTP(data);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.RESEND_OTP_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loginTrainer = async (data: LoginTrainerPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.loginTrainer(data);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.LOGIN_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
        } finally {
            setLoading(false);
        }
    };

    const forgetPassword = async (data: ForgotPasswordTrainerPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.forgotPasswordTrainer(data);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.FORGOT_PASSWORD_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (data: ResetPasswordTrainerPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.resetPasswordTrainer(data);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.RESET_PASSWORD_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
        } finally {
            setLoading(false);
        }
    };

    const logoutTrainer = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.logoutTrainer();
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.LOGOUT_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
        } finally {
            setLoading(false);
        }
    };

    const getCurrentTrainer = async (): Promise<Trainer | null> => {
        try {
            setLoading(true);
            setError(null);
            const response = await trainerAuthService.getCurrentTrainer();
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || TRAINER_AUTH_MESSAGES.FETCH_TRAINER_FAILED);
            } else {
                setError(COMMON_MESSAGES.UNEXPECTED_ERROR);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { registerTrainer, verifyTrainerOtp, loading, error, logoutTrainer, getCurrentTrainer, loginTrainer, resendOTP, forgetPassword, resetPassword };
};
