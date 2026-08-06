import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
export const userAssignmentService={
    async getActiveAssignment()
    {
        const response=await axiosInstance.get(API_ENDPOINTS.TRAINER_ASSIGNMENT.ME);
        return response.data.data
    }
}