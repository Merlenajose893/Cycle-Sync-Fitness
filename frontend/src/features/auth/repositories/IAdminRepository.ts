import type { ApiResponse } from "../../../shared/types/api.types";
import type { User, Trainer, AdminLoginPayload } from "../types/auth.types";

/**
 * Contract for admin data access operations.
 */
export interface IAdminRepository {
  login(data: AdminLoginPayload): Promise<ApiResponse<null>>;
  getAllUsers(): Promise<ApiResponse<User[]>>;
  getAllTrainers(): Promise<ApiResponse<Trainer[]>>;
  blockUser(userId: string): Promise<ApiResponse<null>>;
  unblockUser(userId: string): Promise<ApiResponse<null>>;
  blockTrainer(trainerId: string): Promise<ApiResponse<null>>;
  unblockTrainer(trainerId: string): Promise<ApiResponse<null>>;
  getPendingTrainers(): Promise<ApiResponse<Trainer[]>>;
  approveTrainer(trainerId: string): Promise<ApiResponse<Trainer>>;
  rejectTrainer(trainerId: string, reason: string): Promise<ApiResponse<Trainer>>;
}
