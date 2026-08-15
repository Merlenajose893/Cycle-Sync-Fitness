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

        const isAuthRequest = 
            originalRequest?.url?.includes(API_ENDPOINTS.USER_AUTH.REFRESH) || 
            originalRequest?.url?.includes(API_ENDPOINTS.USER_AUTH.LOGOUT) ||
            originalRequest?.url?.includes(API_ENDPOINTS.TRAINER_AUTH.LOGOUT) ||
            originalRequest?.url?.includes(API_ENDPOINTS.ADMIN.LOGIN) ||
            originalRequest?.url?.includes('/login');

        if (error.response?.status === 401 && !originalRequest?._retry && !isAuthRequest) {
            originalRequest._retry = true;
            try {
                const isTrainerRequest = originalRequest?.url?.includes('/api/trainer');
                const refreshUrl = isTrainerRequest
                    ? API_ENDPOINTS.TRAINER_AUTH.REFRESH
                    : API_ENDPOINTS.USER_AUTH.REFRESH;
                await axiosInstance.post(refreshUrl, {}, { _retry: true } as any);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 403 && error.response?.data?.message?.toLowerCase().includes("blocked")) {
            window.dispatchEvent(new Event("auth-blocked"));
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;