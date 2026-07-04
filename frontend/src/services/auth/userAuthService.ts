import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { 
    RegisterUserPayload, 
    LoginUserPayload, 
    VerifyOtpPayload, 
    User, 
    AuthResponse, 
    ResendOTPPayload,
    ForgotPasswordPayload,
    ResetPasswordPayload 
} from "../../types/auth.types";

export const userAuthService = {
    registerUser: async (data: RegisterUserPayload): Promise<AuthResponse<User>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.USER_AUTH.REGISTER, data);
        return response.data;
    },

    loginUser: async (data: LoginUserPayload): Promise<AuthResponse<null>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.USER_AUTH.LOGIN, data);
        return response.data;
    },

    verifyOtp: async (data: VerifyOtpPayload): Promise<AuthResponse<null>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.USER_AUTH.VERIFY_OTP, data);
        return response.data;
    },

    resendOtp: async (data: ResendOTPPayload): Promise<AuthResponse<null>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.USER_AUTH.RESEND_OTP, data);
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordPayload): Promise<AuthResponse<null>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.USER_AUTH.FORGOTPASSWORD, data);
        return response.data;
    },

    resetPassword: async (data: ResetPasswordPayload): Promise<AuthResponse<null>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.USER_AUTH.RESETPASSWORD, data);
        return response.data;
    },

    logoutUser: async (): Promise<AuthResponse<null>> => {
        const response = await axiosInstance.post(API_ENDPOINTS.USER_AUTH.LOGOUT);
        return response.data;
    },

    getCurrentUser: async (): Promise<AuthResponse<User>> => {
        const response = await axiosInstance.get(API_ENDPOINTS.USER_AUTH.ME);
        return response.data;
    }
};