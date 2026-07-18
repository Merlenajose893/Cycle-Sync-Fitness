import { useState } from "react";
import { userProfileService } from "../../services/profile/userprofileservice";
import type { UserProfile,UpdateUserProfileDTO,ChangePasswordDTO,DeleteAccountDTO } from "../../types/profile.types";
import axios from "axios";
export const useUserProfile=()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState<string|null>(null);

    const getProfile=async ():Promise<UserProfile> => {
        try {
            setLoading(true);
            setError(null);
            const result=await userProfileService.getProfile();
            return result;
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Error getting profile");
            }
            else{
                setError("Unexpected Error")
            }
        }
        finally{
            setLoading(false);
        }
    }

    const updateProfile=async (data:UpdateUserProfileDTO):Promise<UserProfile> => {
        try {
           setLoading(true);
           setError(null);
           const result=await userProfileService.updateProfile(data);
           return result; 
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Error updating profile");
            }
            else{
                setError("Unexpected Error")
            }
        }
        finally{
            setLoading(false);
        }
    }

    const uploadAvatar=async (file:File):Promise<UserProfile> => {
        try {
            setLoading(true);
            setError(null);
            const result=await userProfileService.uploadAvatar(file)
            return result;
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed to Upload the avatar")
            }
            else{
                setError("Unexpected Error")
            }
        }
        finally{
            setLoading(false);
        }
    }

    const deleteAvatar=async ():Promise<UserProfile> => {
        try {
            setLoading(true);
            setError(null);
            const result=await userProfileService.deleteAvatar();
            return result;
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed To delete Avatar")
            }
            else{
                setError("Unexpected Error")
            }
        }
        finally{
            setLoading(false)
        }
    }

    const changePassword=async (data:ChangePasswordDTO):Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const result=await userProfileService.changePassword(data);
            return result;
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed to change password")
            }
            else{
                setError("Unexpected error occured")
            }
        }
        finally{
            setLoading(false)
        }
    }

    const deleteAccount=async (data:DeleteAccountDTO):Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const result=await userProfileService.deleteAccount(data);
            return result;
        } catch (error:unknown) {
            if(axios.isAxiosError(error))
            {
                setError(error.response?.data.message||"Failed to delete Account")
            }
            else{
                setError("Unexpected Error occured")
            }
        }
        finally{
            setLoading(false)
        }
    }

    return {loading,error,getProfile,updateProfile,uploadAvatar,deleteAvatar,changePassword,deleteAccount}
}
