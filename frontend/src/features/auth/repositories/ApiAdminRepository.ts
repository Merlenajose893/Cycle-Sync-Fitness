import axiosInstance from "../../../app/config/axios";
import { AUTH_ENDPOINTS } from "../api/authEndpoints";
import type { ApiResponse } from "../../../shared/types/api.types";
import type { User, Trainer, AdminLoginPayload } from "../types/auth.types";
import type { IAdminRepository } from "./IAdminRepository";

/**
 * HTTP-backed implementation of IAdminRepository.
 */
export class ApiAdminRepository implements IAdminRepository {
  async login(data: AdminLoginPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.ADMIN.LOGIN, data);
    return response.data;
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.ADMIN.USERS);
    return response.data;
  }

  async getAllTrainers(): Promise<ApiResponse<Trainer[]>> {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.ADMIN.TRAINERS);
    return response.data;
  }

  async blockUser(userId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch(`${AUTH_ENDPOINTS.ADMIN.BLOCK_USER}/${userId}/block`);
    return response.data;
  }

  async unblockUser(userId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch(`${AUTH_ENDPOINTS.ADMIN.UNBLOCK_USER}/${userId}/unblock`);
    return response.data;
  }

  async blockTrainer(trainerId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch(`${AUTH_ENDPOINTS.ADMIN.BLOCK_TRAINER}/${trainerId}/block`);
    return response.data;
  }

  async unblockTrainer(trainerId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch(`${AUTH_ENDPOINTS.ADMIN.UNBLOCK_TRAINER}/${trainerId}/unblock`);
    return response.data;
  }

  async getPendingTrainers(): Promise<ApiResponse<Trainer[]>> {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.ADMIN.PENDING_TRAINERS);
    return response.data;
  }

  async approveTrainer(trainerId: string): Promise<ApiResponse<Trainer>> {
    const response = await axiosInstance.patch(`${AUTH_ENDPOINTS.ADMIN.APPROVE_TRAINER}/${trainerId}/approve`);
    return response.data;
  }

  async rejectTrainer(trainerId: string, reason: string): Promise<ApiResponse<Trainer>> {
    const response = await axiosInstance.patch(
      `${AUTH_ENDPOINTS.ADMIN.REJECT_TRAINER}/${trainerId}/reject`,
      { reason }
    );
    return response.data;
  }
}
