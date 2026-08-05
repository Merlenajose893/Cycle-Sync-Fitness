import axios from "axios";

// Temporary: auth endpoints inlined until auth feature is fully migrated
const AUTH_REFRESH = "/api/users/refresh-token";
const AUTH_LOGOUT = "/api/users/logout";
const TRAINER_LOGOUT = "/api/trainer/logout";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthRequest = 
            originalRequest?.url?.includes(AUTH_REFRESH) || 
            originalRequest?.url?.includes(AUTH_LOGOUT) ||
            originalRequest?.url?.includes(TRAINER_LOGOUT) ||
            originalRequest?.url?.includes('/login');

        if (error.response?.status === 401 && !originalRequest?._retry && !isAuthRequest) {
            originalRequest._retry = true;
            try {
                await axiosInstance.post(AUTH_REFRESH, {}, { _retry: true } as any);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        if (error.response?.status === 403) {
            window.dispatchEvent(new Event("auth-blocked"));
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;