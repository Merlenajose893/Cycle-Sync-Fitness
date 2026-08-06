import { useState, useCallback } from "react";
import axios from "axios";
import { trainerClientService } from "../../services/trainer/trainerClientService";

export const useTrainerClients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await trainerClientService.getTrainerClients();
      setClients(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else {
        setError("Failed to fetch clients.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    clients,
    loading,
    error,
    fetchClients,
  };
};
