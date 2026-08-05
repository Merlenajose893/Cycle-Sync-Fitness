import type { ITrainerAuthRepository } from "../repositories/ITrainerAuthRepository";
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
 * Business logic layer for trainer authentication.
 */
export class TrainerAuthService {
  constructor(private readonly repository: ITrainerAuthRepository) {}

  async registerTrainer(data: RegisterTrainerPayload): Promise<ApiResponse<Trainer>> {
    return this.repository.register(data);
  }

  async verifyTrainerOtp(data: VerifyTrainerOtpPayload): Promise<ApiResponse<null>> {
    return this.repository.verifyOtp(data);
  }

  async resendOTP(data: ResendTrainerOTPPayload): Promise<ApiResponse<null>> {
    return this.repository.resendOtp(data);
  }

  async loginTrainer(data: LoginTrainerPayload): Promise<ApiResponse<null>> {
    return this.repository.login(data);
  }

  async logoutTrainer(): Promise<ApiResponse<null>> {
    return this.repository.logout();
  }

  async forgotPasswordTrainer(data: ForgotPasswordTrainerPayload): Promise<ApiResponse<null>> {
    return this.repository.forgotPassword(data);
  }

  async resetPasswordTrainer(data: ResetPasswordTrainerPayload): Promise<ApiResponse<null>> {
    return this.repository.resetPassword(data);
  }

  async getCurrentTrainer(): Promise<ApiResponse<Trainer>> {
    return this.repository.getCurrentTrainer();
  }
}
