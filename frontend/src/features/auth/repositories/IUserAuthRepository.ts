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

/**
 * Contract for user authentication data access.
 * Implementations can swap between API, mock, or cache strategies.
 */
export interface IUserAuthRepository {
  register(data: RegisterUserPayload): Promise<ApiResponse<User>>;
  googleSignIn(data: GoogleSignInPayload): Promise<ApiResponse<null>>;
  login(data: LoginUserPayload): Promise<ApiResponse<null>>;
  verifyOtp(data: VerifyOtpPayload): Promise<ApiResponse<null>>;
  resendOtp(data: ResendOTPPayload): Promise<ApiResponse<null>>;
  logout(): Promise<ApiResponse<null>>;
  forgotPassword(data: ForgotPasswordPayload): Promise<ApiResponse<null>>;
  resetPassword(data: ResetPasswordPayload): Promise<ApiResponse<null>>;
  getCurrentUser(): Promise<ApiResponse<User>>;
}
