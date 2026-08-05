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

/**
 * Contract for trainer authentication data access.
 */
export interface ITrainerAuthRepository {
  register(data: RegisterTrainerPayload): Promise<ApiResponse<Trainer>>;
  verifyOtp(data: VerifyTrainerOtpPayload): Promise<ApiResponse<null>>;
  resendOtp(data: ResendTrainerOTPPayload): Promise<ApiResponse<null>>;
  login(data: LoginTrainerPayload): Promise<ApiResponse<null>>;
  logout(): Promise<ApiResponse<null>>;
  forgotPassword(data: ForgotPasswordTrainerPayload): Promise<ApiResponse<null>>;
  resetPassword(data: ResetPasswordTrainerPayload): Promise<ApiResponse<null>>;
  getCurrentTrainer(): Promise<ApiResponse<Trainer>>;
}
