import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
export const trainerMarketPlaceService={
    async getApprovedTrainers()
    {
        const response=await axiosInstance.get(API_ENDPOINTS.TRAINER_MARKETPLACE.BROWSE);
        return response.data.data;
    },
    async getTrainerProfile(trainerId:string)
    {
        const response=await axiosInstance.get(API_ENDPOINTS.TRAINER_MARKETPLACE.PROFILE(trainerId));
        return response.data.data;
    },
    async getTrainerPackages(trainerId:string)
    {
        const response=await axiosInstance.get(API_ENDPOINTS.TRAINER_MARKETPLACE.PACKAGES(trainerId));
        return response.data.data
    }

}