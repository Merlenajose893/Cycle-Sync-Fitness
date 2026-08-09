import { useState, useCallback, useEffect } from 'react';
import { healthService } from '../../services/health/healthService';
import type {
  CycleLog,
  CyclePrediction,
  DailyHealthLog,
  HealthMilestone,
  StartPeriodDTO,
  EndPeriodDTO,
  CreateHealthLogDTO,
} from '../../types/health.types';

export const useHealthTracking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [cycleLogs, setCycleLogs] = useState<CycleLog[]>([]);
  const [prediction, setPrediction] = useState<CyclePrediction | null>(null);
  const [todayLog, setTodayLog] = useState<DailyHealthLog | null>(null);
  const [milestones, setMilestones] = useState<HealthMilestone[]>([]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [logsData, predData, todayData, milestonesData] = await Promise.all([
        healthService.getCycleLogs(),
        healthService.getPredictions(),
        healthService.getTodayLog(),
        healthService.getMilestones(),
      ]);

      setCycleLogs(logsData || []);
      setPrediction(predData || null);
      setTodayLog(todayData || null);
      setMilestones(milestonesData || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load health tracking data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const startPeriod = async (dto: StartPeriodDTO) => {
    setLoading(true);
    try {
      await healthService.startPeriod(dto);
      await fetchAllData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to start period');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const endPeriod = async (logId: string, dto: EndPeriodDTO) => {
    setLoading(true);
    try {
      await healthService.endPeriod(logId, dto);
      await fetchAllData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to end period');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addWater = async (amountMl: number) => {
    try {
      const updated = await healthService.addWaterIntake(amountMl);
      setTodayLog(updated);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update water intake');
    }
  };

  const logDailyHealth = async (dto: CreateHealthLogDTO) => {
    setLoading(true);
    try {
      const updated = await healthService.logDailyHealth(dto);
      setTodayLog(updated);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to log health data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    cycleLogs,
    prediction,
    todayLog,
    milestones,
    refreshData: fetchAllData,
    startPeriod,
    endPeriod,
    addWater,
    logDailyHealth,
  };
};
