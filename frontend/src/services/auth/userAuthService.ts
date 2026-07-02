import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
<<<<<<< HEAD
import type { RegisterUserPayload,LoginUserPayload,VerifyOtpPayload,User,AuthResponse, ResendOTPPayload,ForgotPasswordPayload, ResetPasswordPayload } from "../../types/auth.types";
=======
import type { RegisterUserPayload,LoginUserPayload,VerifyOtpPayload,User,AuthResponse, ResendOTPPayload } from "../../types/auth.types";
>>>>>>> 081b12d (changes)
export const userAuthService={
    registerUser:async (data:RegisterUserPayload):Promise<AuthResponse<User>> => {
        console.log(API_ENDPOINTS.USER_AUTH.REGISTER);
        
        const response=await axiosInstance.post(API_ENDPOINTS.USER_AUTH.REGISTER,data)
        console.log(response.data);
        return response.data;

        

    
    },


    loginUser:async (data:LoginUserPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.USER_AUTH.LOGIN,data);
        return response.data
    },
    verifyOtp:async (data:VerifyOtpPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.USER_AUTH.VERIFY_OTP,data);
        console.log(response.data);
        
        return response.data;
    },

    resendOtp:async (data:ResendOTPPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.USER_AUTH.RESEND_OTP,data)
        return response.data;
    },
    logoutUser:async ():Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.USER_AUTH.LOGOUT);
        return response.data;
    },
<<<<<<< HEAD
    forgotPassword:async (data:ForgotPasswordPayload):Promise<AuthResponse<null>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.USER_AUTH.FORGOTPASSWORD,data);
        return response.data
    },

    resetPassword:async (data:ResetPasswordPayload):Promise<AuthResponse<null>> => {
       const response=await axiosInstance.post(API_ENDPOINTS.USER_AUTH.RESETPASSWORD(data));
       return response.data; 
    },
=======
>>>>>>> 081b12d (changes)

    getCurrentUser:async ():Promise<AuthResponse<User>> => {
        const response=await axiosInstance.get(API_ENDPOINTS.USER_AUTH.ME);
        return response.data;
    }
<<<<<<< HEAD

=======
>>>>>>> 081b12d (changes)
}

console.log(userAuthService.registerUser);
