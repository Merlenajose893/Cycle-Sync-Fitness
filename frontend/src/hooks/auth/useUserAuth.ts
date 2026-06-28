import { useState } from "react";
import { userAuthService } from "../../services/auth/userAuthService";
import type { RegisterUserPayload,LoginUserPayload,VerifyOtpPayload,User, ResendOTPPayload } from "../../types/auth.types";
export const useUserAuth=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState<string|null>(null);
    const registerUser=async (data:RegisterUserPayload) => {
        try {
            setLoading(true);
            setError(null);
            const response=await userAuthService.registerUser(data);
            return response;
        } catch (error:any) {
            setError(error?.response?.data?.message||"Registration failed")
            throw error;
        }
        finally{
            setLoading(false)
        }
    }

    const verifyOtp=async (data:VerifyOtpPayload) => {
        try {
          setLoading(true);
          setError(null);
          const response=await userAuthService.verifyOtp(data);
          return response;

        } catch (error:any) {
            setError(error.response?.data?.message||"OTP verification failed");
            throw error;
        }

        finally{
            setLoading(false)
        }
    }

    const resendOTP=async (data:ResendOTPPayload) => {
        try {
           setLoading(true);
           setError(null);
           const response=await userAuthService.resendOtp(data);
           return response;
        } catch (error:any) {
            setError(error.response?.data?.message||"OTP is not resend successfully")
            throw error
        }

        finally{
            setLoading(false)
        }
    }

    const loginUser=async (data:LoginUserPayload) => {
        try {
            setLoading(false);
            setError(null);
            const response=await userAuthService.loginUser(data);
            return response;
        } catch (error:any) {
            setError(error.response?.data?.message||"Login Failed")
            throw error;
        }
        finally{
            setLoading(false)
        }
    }

    const logoutUser=async () => {
        try {
            setLoading(true);
            setError(null);
            const response=await userAuthService.logoutUser();
            return response;

        } catch (error:any) {
            setError(error.response?.data?.message||"Logout failed");
            throw error;
        }
        finally{
            setLoading(false)
        }
    }

    const getUser=async():Promise<User|null>  => {
        try {
            setLoading(true);
            setError(null);
            const response=await userAuthService.getCurrentUser();
            return response.data;
        } catch (error) {
            return null;
        }
        finally{
            setLoading(false)
        }
    }

    return {
        loading,error,registerUser,verifyOtp,loginUser,logoutUser,getUser,resendOTP
    }


}


