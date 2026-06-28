
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
}
}

