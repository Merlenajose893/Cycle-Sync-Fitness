import axios from "axios";
const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,
})
axiosInstance.interceptors.response.use((response)=>response,async (error) => {
    const originalRequest=error.config;
    if(error.response?.status===401 && !originalRequest._retry)
    {
        originalRequest._retry=true;
        try {
            await axiosInstance.post("/users/refresh");
            return axiosInstance(originalRequest)
        } catch (refreshError) {
            window.location.href='/login';
            return Promise.reject(refreshError)
        }
    }
    return Promise.reject(error)
})
console.log(import.meta.env.VITE_API_URL)
export default axiosInstance;