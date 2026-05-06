import axiosInstance from "../api/axiosInstance";
import type { User } from "../types/user.types";
export interface AuthResponse{
    token:string;
    user:User;
}

export const registerUser=(data:any)=>
    axiosInstance.post<AuthResponse>('/auth/register',data);