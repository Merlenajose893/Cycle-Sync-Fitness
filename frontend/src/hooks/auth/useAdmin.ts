import { useState } from "react";
import axios from "axios";
import { adminService } from "../../services/auth/adminAuthService";
import type { User,Trainer } from "../../types/auth.types";
import type  { AdminLoginPayload } from "../../types/admin.types";

export const useAdminAuth=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState<string|null>(null);

    const adminLogin=async (data:AdminLoginPayload) => {
        try {
            setLoading(true);
            setError(null);

            const response=await adminService.adminLogin(data);
            return response

        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data?.message||"Admin login failed")
                
            }
            else{
                setError("Unexpected error occured")
            }
            throw error;
        }
        finally{
            setLoading(false)
        }
    }

    const getAllUsers=async ():Promise<User[]> => {
        try {
            setLoading(true);
            setError(null);
            const response=await adminService.getAllUsers();
            return response.data;
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data?.message||"Failed to Fetch Users")
            }
            else{
                setError("Unexpected Error occured")
            }
            return [];
        }
        finally{
            setLoading(false)
        }
    }

    const getAllTrainers=async ():Promise<Trainer[]> => {
        try {
           setLoading(true);
           setError(null);
           const response=await adminService.getAllTrainers();
           return response.data; 
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data?.message||"Failed to fetch trainers")
            }
            else{
                setError("Unexpecteed Error Occurs")
            }
            return []
        }
        finally{
            setLoading(false)
        }
    }

    return {adminLogin,getAllUsers,getAllTrainers,loading,error}
}