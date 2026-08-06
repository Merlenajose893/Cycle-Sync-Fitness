import axiosInstance from "../../api/axios";

export const paymentService = {
  async createCheckoutSession(packageId: string) {
    const response = await axiosInstance.post("/api/payment/checkout-session", { packageId });
    return response.data.data;
  },
};
