import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axiosInstance.post(API_ENDPOINTS.USER_AUTH.REFRESH);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Reject the promise and let context/route-guards handle redirection
                return Promise.reject(refreshError);
            }
        }

        console.log(error.response.status);
        
        if (error.response?.status === 403) {
            window.dispatchEvent(new Event("auth-blocked"));
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;