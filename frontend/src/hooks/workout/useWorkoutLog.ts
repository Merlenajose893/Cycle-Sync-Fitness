import { useState, useCallback } from 'react';
import { workoutLogService } from '../../services/workout/workoutLogService';
import type {
  WorkoutLog,
  CreateWorkoutLogPayload,
} from '../../types/workout.types';

export const useWorkoutLog = () => {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [dailyLog, setDailyLog] = useState<WorkoutLog | null>(null);
  const [totalLogs, setTotalLogs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async (page = 1, limit = 20) => {
    setLoading(true);
    setError(null);
    try {
      const res = await workoutLogService.getWorkoutHistory(page, limit);
      setLogs(res.logs);
      setTotalLogs(res.total);
      return res;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch workout history';
      setError(msg);
      return { logs: [], total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDailyLog = useCallback(async (date?: string) => {
    setLoading(true);
    setError(null);
    try {
      const log = await workoutLogService.getDailyLog(date);
      setDailyLog(log);
      return log;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch daily workout log';
      setError(msg);
      setDailyLog(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitWorkoutLog = async (payload: CreateWorkoutLogPayload) => {
    setLoading(true);
    setError(null);
    try {
      const newLog = await workoutLogService.logWorkout(payload);
      setLogs((prev) => [newLog, ...prev]);
      setDailyLog(newLog);
      return newLog;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to submit workout log';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    logs,
    dailyLog,
    totalLogs,
    loading,
    error,
    fetchHistory,
    fetchDailyLog,
    submitWorkoutLog,
  };
};
