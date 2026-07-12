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

    const blockUser=async (userId:string) => {
        try {
            setLoading(true);
            setError(null);
            return await adminService.blockUser(userId);
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed to block user")
            }
            else{
                setError("Unexpected error occured")
            }
            throw error;
        }

        finally{
            setLoading(false);
        }
    }

    const unblockUser=async (userId:string) => {
        try {
            setLoading(true);
            setError(null);
            return await adminService.unblockUser(userId);

        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed to unblock user");
            }
            else{
                setError("unexpectec error occured")
            }
            throw error;
        }
        finally{
            setLoading(false)
        }
    }


    const blockTrainer=async (trainerId:string) => {
        try {
            setLoading(true);
            setError(null);
            return await adminService.blockTrainer(trainerId);
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed to block the trainer")
            }
            else{
                setError("Unexpected error occured")
            }
        }
        finally{
            setLoading(false);
        }
    }

    const unblockTrainer=async (trainerId:string) => {
        try {
            setLoading(true);
            setError(null);
            return adminService.unblockTrainer(trainerId);
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed to unblock the trainer")
            }
            else{
                setError("Unexpected error occured")
            }
        }
        finally{
            setLoading(false)
        }
    }
    const getPendingTrainers = async (): Promise<Trainer[]> => {
    try {
        setLoading(true);
        setError(null);

        const response = await adminService.getPendingTrainers();

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            setError(
                error.response?.data?.message || "Failed to fetch pending trainers"
            );
        } else {
            setError("Unexpected error occurred");
        }

        return [];
    } finally {
        setLoading(false);
    }
};

const approveTrainer = async (trainerId: string) => {
    try {
        setLoading(true);
        setError(null);

        return await adminService.approveTrainer(trainerId);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            setError(
                error.response?.data?.message || "Failed to approve trainer"
            );
        } else {
            setError("Unexpected error occurred");
        }

        throw error;
    } finally {
        setLoading(false);
    }
};
const rejectTrainer = async (
    trainerId: string,
    reason: string
) => {
    try {
        setLoading(true);
        setError(null);

        return await adminService.rejectTrainer(trainerId, reason);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            setError(
                error.response?.data?.message || "Failed to reject trainer"
            );
        } else {
            setError("Unexpected error occurred");
        }

        throw error;
    } finally {
        setLoading(false);
    }
};



    return {adminLogin,getAllUsers,getAllTrainers,blockUser,unblockUser,blockTrainer,unblockTrainer,getPendingTrainers,approveTrainer,rejectTrainer,loading,error}
}