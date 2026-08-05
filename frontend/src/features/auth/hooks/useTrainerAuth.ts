import { useState } from "react";
import axios from "axios";
import { ApiTrainerAuthRepository } from "../repositories/ApiTrainerAuthRepository";
import { TrainerAuthService } from "../services/TrainerAuthService";
import type {
  RegisterTrainerPayload,
  LoginTrainerPayload,
  VerifyTrainerOtpPayload,
  ResendTrainerOTPPayload,
  ForgotPasswordTrainerPayload,
  ResetPasswordTrainerPayload,
  Trainer,
} from "../types/auth.types";

// Factory-created service with injected repository
const trainerAuthService = new TrainerAuthService(new ApiTrainerAuthRepository());

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
        setError(error.response?.data?.message || "Trainer registration failed");
      } else {
        setError("Unexpected error occured");
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
        setError(error.response?.data?.message || "OTP verification failed");
      } else {
        setError("Unexpected error occured");
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
        setError(error.response?.data?.message || "Resend Otp is error");
      } else {
        setError("Unexpected Error");
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
        setError(error.response?.data?.message || "Trainer is logged in");
      } else {
        setError("Unexpected Error");
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
        setError(error.response?.data.message || "Forget password is not gettig");
      } else {
        setError("Unexpected Error");
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
        setError(error.response?.data.message || "Reset password is having error");
      } else {
        setError("Something went wrong");
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
        setError(error.response?.data?.message || "Trainer is logged out");
      } else {
        setError("Unexpected Error");
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
        setError(error.response?.data?.message || "Trainer is not getting");
      } else {
        setError("Unexpected error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerTrainer,
    verifyTrainerOtp,
    loading,
    error,
    logoutTrainer,
    getCurrentTrainer,
    loginTrainer,
    resendOTP,
    forgetPassword,
    resetPassword,
  };
};
