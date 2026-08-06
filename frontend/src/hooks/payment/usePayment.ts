import { useState, useCallback } from "react";
import axios from "axios";
import { paymentService } from "../../services/payment/paymentService";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(async (packageId: string) => {
    setLoading(true);
    setPurchasingId(packageId);
    setError(null);

    try {
      const data = await paymentService.createCheckoutSession(packageId);
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setError("Failed to generate Stripe checkout URL.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else {
        setError("Something went wrong with checkout.");
      }
    } finally {
      setLoading(false);
      setPurchasingId(null);
    }
  }, []);

  return {
    checkout,
    loading,
    purchasingId,
    error,
  };
};
