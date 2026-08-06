import axiosInstance from "../../api/axios"
import { API_ENDPOINTS } from "../../constants/apiEndpoints"
export const trainerClientService={
async getTrainerClients(){
    const response=await axiosInstance.get(API_ENDPOINTS.TRAINER_ASSIGNMENT.TRAINERCLIENTS);
    return response.data.data;
}


}