
import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { AdminLoginPayload, AuthResponse, Trainer, User } from "../../types/auth.types";
export const adminService={
adminLogin:async (data:AdminLoginPayload):Promise<AuthResponse<null>> => {
    const response=await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGIN,data);
    return response.data
},

getAllUsers:async ():Promise<AuthResponse<User[]>> => {
    const response=await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS)
    return response.data
},
getAllTrainers:async ():Promise<AuthResponse<Trainer[]>> => {
    const response=await axiosInstance.get(API_ENDPOINTS.ADMIN.TRAINERS);
    return response.data
},

blockUser:async (userId:string) => {
    const response=await axiosInstance.patch(`${API_ENDPOINTS.ADMIN.BLOCK_USER}/${userId}/block`);
    return response.data;
},
unblockUser:async(userId:string)=>{
    const response=await axiosInstance.patch(`${API_ENDPOINTS.ADMIN.UNBLOCK_USER}/${userId}/unblock`);
    return response.data;
},

blockTrainer:async (trainerId:string) => {
    const response=await axiosInstance.patch(`${API_ENDPOINTS.ADMIN.BLOCK_TRAINER}/${trainerId}/block`);
    return response.data;
},

unblockTrainer:async (trainerId:string) => {
    const response=await axiosInstance.patch(`${API_ENDPOINTS.ADMIN.UNBLOCK_TRAINER}/${trainerId}/unblock`)
    return response.data
},
getPendingTrainers: async (): Promise<AuthResponse<Trainer[]>> => {
    const response = await axiosInstance.get(
        API_ENDPOINTS.ADMIN.PENDING_TRAINERS
    );

    return response.data;
},

approveTrainer: async (trainerId: string): Promise<AuthResponse<Trainer>> => {
    const response = await axiosInstance.patch(
        `${API_ENDPOINTS.ADMIN.APPROVE_TRAINER}/${trainerId}/approve`
    );

    return response.data;
},

rejectTrainer: async (
    trainerId: string,
    reason: string
): Promise<AuthResponse<Trainer>> => {
    const response = await axiosInstance.patch(
        `${API_ENDPOINTS.ADMIN.REJECT_TRAINER}/${trainerId}/reject`,
        { reason }
    );

    return response.data;
},

}

