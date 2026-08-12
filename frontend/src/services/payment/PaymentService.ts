import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
export const paymentService={
    async createCheckoutSession(packageId:string){
        const response=await axiosInstance.post(API_ENDPOINTS.PAYMENT.CHECKOUt_SESSION(packageId),{packageId});
        return response.data.data;
    }
}