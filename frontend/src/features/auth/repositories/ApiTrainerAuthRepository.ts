import axiosInstance from "../../../app/config/axios";
import { AUTH_ENDPOINTS } from "../api/authEndpoints";
import type { ApiResponse } from "../../../shared/types/api.types";
import type {
  RegisterTrainerPayload,
  LoginTrainerPayload,
  VerifyTrainerOtpPayload,
  ResendTrainerOTPPayload,
  ForgotPasswordTrainerPayload,
  ResetPasswordTrainerPayload,
  Trainer,
} from "../types/auth.types";
import type { ITrainerAuthRepository } from "./ITrainerAuthRepository";

/**
 * HTTP-backed implementation of ITrainerAuthRepository.
 */
export class ApiTrainerAuthRepository implements ITrainerAuthRepository {
  async register(data: RegisterTrainerPayload): Promise<ApiResponse<Trainer>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.TRAINER_AUTH.REGISTER, data);
    return response.data;
  }

  async verifyOtp(data: VerifyTrainerOtpPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.TRAINER_AUTH.VERIFY_OTP, data);
    return response.data;
  }

  async resendOtp(data: ResendTrainerOTPPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.TRAINER_AUTH.RESEND_OTP, data);
    return response.data;
  }

  async login(data: LoginTrainerPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.TRAINER_AUTH.LOGIN, data);
    return response.data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.TRAINER_AUTH.LOGOUT);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordTrainerPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.TRAINER_AUTH.FORGOT_PASSWORD, data);
    return response.data;
  }

  async resetPassword(data: ResetPasswordTrainerPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.TRAINER_AUTH.RESET_PASSWORD, data);
    return response.data;
  }

  async getCurrentTrainer(): Promise<ApiResponse<Trainer>> {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.TRAINER_AUTH.ME);
    return response.data;
  }
}
