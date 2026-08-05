import type { IUserAuthRepository } from "../repositories/IUserAuthRepository";
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
 * Business logic layer for user authentication.
 * Delegates data access to the injected repository.
 */
export class UserAuthService {
  constructor(private readonly repository: IUserAuthRepository) {}

  async registerUser(data: RegisterUserPayload): Promise<ApiResponse<User>> {
    return this.repository.register(data);
  }

  async googleSignIn(data: GoogleSignInPayload): Promise<ApiResponse<null>> {
    return this.repository.googleSignIn(data);
  }

  async loginUser(data: LoginUserPayload): Promise<ApiResponse<null>> {
    return this.repository.login(data);
  }

  async verifyOtp(data: VerifyOtpPayload): Promise<ApiResponse<null>> {
    return this.repository.verifyOtp(data);
  }

  async resendOtp(data: ResendOTPPayload): Promise<ApiResponse<null>> {
    return this.repository.resendOtp(data);
  }

  async logoutUser(): Promise<ApiResponse<null>> {
    return this.repository.logout();
  }

  async forgotPassword(data: ForgotPasswordPayload): Promise<ApiResponse<null>> {
    return this.repository.forgotPassword(data);
  }

  async resetPassword(data: ResetPasswordPayload): Promise<ApiResponse<null>> {
    return this.repository.resetPassword(data);
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.repository.getCurrentUser();
  }
}
