import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { updateBodyDetailsDTO,updateCycleSetUpDTO,updateGoalsDTO,useronboardingStatus,AuthResponse } from "../../types/useronboarding.types";
export const userOnboardingService={
    getOnboardingStatus:async ():Promise<AuthResponse<useronboardingStatus>> => {
        const response=await axiosInstance.get(API_ENDPOINTS.USER_ONBOARDING.STATUS)
        return response.data;
    },

    updateBodyDetails:async (data:updateBodyDetailsDTO):Promise<AuthResponse<useronboardingStatus>> => {
        const response=await axiosInstance.put(API_ENDPOINTS.USER_ONBOARDING.BODY_DETAILS,data)
        return response.data;
    },

    updateCycleSetUp:async (data:updateCycleSetUpDTO):Promise<AuthResponse<useronboardingStatus>> => {
        const response=await axiosInstance.put(API_ENDPOINTS.USER_ONBOARDING.CYCLE_SETUP,data);
        return response.data;
    },
    updateGoals:async (data:updateGoalsDTO):Promise<AuthResponse<useronboardingStatus>> => {
        const response=await axiosInstance.put(API_ENDPOINTS.USER_ONBOARDING.GOALS,data)
        return response.data;
    },

    completeOnboarding:async ():Promise<AuthResponse<useronboardingStatus>> => {
        const response=await axiosInstance.post(API_ENDPOINTS.USER_ONBOARDING.COMPLETE);
        return response.data;
    }



}