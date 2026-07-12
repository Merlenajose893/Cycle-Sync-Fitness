import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { AuthResponse } from "../../types/auth.types";
import type { UpdateTrainerProfileDTO,UpdateTrainerCertificateDTO,UpdateTrainerPackageDTO,TrainerOnboardingStatus } from "../../types/traineronboarding.types";
export const traineronboardingService={
    getOnboardingStatus:async ():Promise<AuthResponse<TrainerOnboardingStatus>> => {
        const response=await axiosInstance.get(API_ENDPOINTS.TRAINER_ONBOARDING.STATUS);
        return response.data;
    },
    updateTrainerProfile:async (data:UpdateTrainerProfileDTO):Promise<AuthResponse<TrainerOnboardingStatus>> => {
        const response=await axiosInstance.put(API_ENDPOINTS.TRAINER_ONBOARDING.PROFILE,data);
        console.log(response);
        
        return response.data;
    },
    updateTrainerCertifications:async (data:UpdateTrainerCertificateDTO):Promise<AuthResponse<TrainerOnboardingStatus>> => {
        const response=await axiosInstance.put(API_ENDPOINTS.TRAINER_ONBOARDING.CERTIFICATIONS,data);
        return response.data;
    },
    updateTrainerPackages:async (data:UpdateTrainerPackageDTO):Promise<AuthResponse<TrainerOnboardingStatus>> => {
        const response=await axiosInstance.put(API_ENDPOINTS.TRAINER_ONBOARDING.PACKAGES,data);
        return response.data;
    },
    completeOnboarding:async ():Promise<AuthResponse<TrainerOnboardingStatus>> => {
        const response=await axiosInstance.put(API_ENDPOINTS.TRAINER_ONBOARDING.COMPLETE);
        return response.data
    },
    uploadAvatar:async(file:File):Promise<AuthResponse<TrainerOnboardingStatus>>=>{
        const formData=new FormData();
        formData.append("avatar",file)
        const response=await axiosInstance.post(API_ENDPOINTS.TRAINER_ONBOARDING.AVATAR,formData)
        return response.data
    }
}