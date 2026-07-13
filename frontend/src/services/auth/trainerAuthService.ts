import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { RegisterTrainerPayload,LoginTrainerPayload,VerifyTrainerOtpPayload,AuthResponse, Trainer, ResendTrainerOTPPayload, ForgotPasswordTrainerPayload, ResetPasswordTrainerPayload } from "../../types/auth.types";
import type { RegisterTrainerInviteDTO } from "../../types/trainer.types";
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

    forgotPasswordTrainer:async (data:ForgotPasswordTrainerPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_AUTH.FORGOT_PASSWORD,data);
        return response.data
    },
    resetPasswordTrainer:async (data:ResetPasswordTrainerPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_AUTH.RESET_PASSWORD,data);
        return response.data
    }
    
}