import axiosInstance from "../../../app/config/axios";
import { AUTH_ENDPOINTS } from "../api/authEndpoints";
import type { ApiResponse } from "../../../shared/types/api.types";
import type {
  RegisterUserPayload,
  LoginUserPayload,
  VerifyOtpPayload,
  ResendOTPPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  GoogleSignInPayload,
  User,
} from "../types/auth.types";
import type { IUserAuthRepository } from "./IUserAuthRepository";

/**
 * HTTP-backed implementation of IUserAuthRepository.
 * Handles all user authentication API calls via Axios.
 */
export class ApiUserAuthRepository implements IUserAuthRepository {
  async register(data: RegisterUserPayload): Promise<ApiResponse<User>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.REGISTER, data);
    return response.data;
  }

  async googleSignIn(data: GoogleSignInPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.GOOGLE_SIGNIN, data);
    return response.data;
  }

  async login(data: LoginUserPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.LOGIN, data);
    return response.data;
  }

  async verifyOtp(data: VerifyOtpPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.VERIFY_OTP, data);
    return response.data;
  }

  async resendOtp(data: ResendOTPPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.RESEND_OTP, data);
    return response.data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.LOGOUT);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.FORGOT_PASSWORD, data);
    return response.data;
  }

  async resetPassword(data: ResetPasswordPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.USER_AUTH.RESET_PASSWORD, data);
    return response.data;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.USER_AUTH.ME);
    return response.data;
  }
}
