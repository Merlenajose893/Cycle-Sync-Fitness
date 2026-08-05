import type { IAdminRepository } from "../repositories/IAdminRepository";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { User, Trainer, AdminLoginPayload } from "../types/auth.types";

/**
 * Business logic layer for admin operations.
 */
export class AdminService {
  constructor(private readonly repository: IAdminRepository) {}

  async adminLogin(data: AdminLoginPayload): Promise<ApiResponse<null>> {
    return this.repository.login(data);
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.repository.getAllUsers();
  }

  async getAllTrainers(): Promise<ApiResponse<Trainer[]>> {
    return this.repository.getAllTrainers();
  }

  async blockUser(userId: string): Promise<ApiResponse<null>> {
    return this.repository.blockUser(userId);
  }

  async unblockUser(userId: string): Promise<ApiResponse<null>> {
    return this.repository.unblockUser(userId);
  }

  async blockTrainer(trainerId: string): Promise<ApiResponse<null>> {
    return this.repository.blockTrainer(trainerId);
  }

  async unblockTrainer(trainerId: string): Promise<ApiResponse<null>> {
    return this.repository.unblockTrainer(trainerId);
  }

  async getPendingTrainers(): Promise<ApiResponse<Trainer[]>> {
    return this.repository.getPendingTrainers();
  }

  async approveTrainer(trainerId: string): Promise<ApiResponse<Trainer>> {
    return this.repository.approveTrainer(trainerId);
  }

  async rejectTrainer(trainerId: string, reason: string): Promise<ApiResponse<Trainer>> {
    return this.repository.rejectTrainer(trainerId, reason);
  }
}
