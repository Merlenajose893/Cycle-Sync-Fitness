import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { RegisterTrainerPayload,LoginTrainerPayload,VerifyTrainerOtpPayload,AuthResponse, Trainer, ResendTrainerOTPPayload } from "../../types/auth.types";
export const trainerAuthService={
    registerTrainer:async (data:RegisterTrainerPayload):Promise<AuthResponse<Trainer>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_AUTH.REGISTER,data)
        return response.data;
    },
    verifyTrainerOtp:async (data:VerifyTrainerOtpPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_AUTH.VERIFY_OTP,data);
        return response.data;
    },
    resendOTP:async (data:ResendTrainerOTPPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_AUTH.RESEND_OTP,data);
        return response.data;
    },
    loginTrainer:async (data:LoginTrainerPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_AUTH.LOGIN,data);
        return response.data;
    },
    logoutTrainer:async ():Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_AUTH.LOGOUT)
        return response.data
    },
    getCurrentTrainer:async ():Promise<AuthResponse<Trainer>> => {
        const response=await axiosInstance.get(API_ENDPOINTS.TRAINER_AUTH.ME);
        return response.data;
    },
}