import { useCallback, useState } from "react";
import axios from "axios";
import { trainerMarketPlaceService } from "../../services/marketplace/trainerMarketplaceService";

export const useTrainerMarketplace = () => {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null);
  const [packages, setPackages] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await trainerMarketPlaceService.getApprovedTrainers();
      setTrainers(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrainerProfile = useCallback(async (trainerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await trainerMarketPlaceService.getTrainerProfile(
        trainerId
      );
      setSelectedTrainer(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPackages = useCallback(async (trainerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await trainerMarketPlaceService.getTrainerPackages(
        trainerId
      );
      setPackages(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    trainers,
    selectedTrainer,
    packages,
    loading,
    error,
    fetchTrainers,
    fetchTrainerProfile,
    fetchPackages,
  };
};