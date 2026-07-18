import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type {
  UserProfile,
  UpdateUserProfileDTO,
  ChangePasswordDTO,
  DeleteAccountDTO,
} from "../../types/profile.types";

export const userProfileService = {
  async getProfile(): Promise<UserProfile> {
    const response = await axiosInstance.get(
      API_ENDPOINTS.USER_PROFILE.PROFILE
    );

    return response.data.data;
  },

  async updateProfile(
    data: UpdateUserProfileDTO
  ): Promise<UserProfile> {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.USER_PROFILE.PROFILE,
      data
    );

    return response.data.data;
  },

  async uploadAvatar(file: File): Promise<UserProfile> {
    const formData = new FormData();

    formData.append("avatar", file);

    const response = await axiosInstance.patch(
      API_ENDPOINTS.USER_PROFILE.AVATAR,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  },

  async deleteAvatar(): Promise<UserProfile> {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.USER_PROFILE.AVATAR
    );

    return response.data.data;
  },

  async changePassword(
    data: ChangePasswordDTO
  ): Promise<void> {
    await axiosInstance.patch(
      API_ENDPOINTS.USER_ACCOUNT.CHANGE_PASSWORD,
      data
    );
  },

  async deleteAccount(
    data: DeleteAccountDTO
  ): Promise<void> {
    await axiosInstance.delete(
      API_ENDPOINTS.USER_ACCOUNT.DELETE_ACCOUNT,
      {
        data,
      }
    );
  },
};