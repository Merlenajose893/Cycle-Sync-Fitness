import axiosInstance from '../../api/axios';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import type {
  CycleLog,
  CyclePrediction,
  DailyHealthLog,
  HealthMilestone,
  StartPeriodDTO,
  EndPeriodDTO,
  CreateHealthLogDTO,
} from '../../types/health.types';

export const healthService = {
  // Cycle Tracking
  async startPeriod(dto: StartPeriodDTO): Promise<CycleLog> {
    const res = await axiosInstance.post(API_ENDPOINTS.HEALTH_TRACKING.CYCLE_START, dto);
    return res.data.data;
  },

  async endPeriod(logId: string, dto: EndPeriodDTO): Promise<CycleLog> {
    const res = await axiosInstance.put(API_ENDPOINTS.HEALTH_TRACKING.CYCLE_END(logId), dto);
    return res.data.data;
  },

  async getCycleLogs(): Promise<CycleLog[]> {
    const res = await axiosInstance.get(API_ENDPOINTS.HEALTH_TRACKING.CYCLE_LOGS);
    return res.data.data;
  },

  async getPredictions(): Promise<CyclePrediction> {
    const res = await axiosInstance.get(API_ENDPOINTS.HEALTH_TRACKING.CYCLE_PREDICTIONS);
    return res.data.data;
  },

  async deleteCycleLog(logId: string): Promise<void> {
    await axiosInstance.delete(API_ENDPOINTS.HEALTH_TRACKING.CYCLE_DELETE(logId));
  },

  // Daily Health & Water
  async logDailyHealth(dto: CreateHealthLogDTO): Promise<DailyHealthLog> {
    const res = await axiosInstance.post(API_ENDPOINTS.HEALTH_TRACKING.DAILY_LOG, dto);
    return res.data.data;
  },

  async getTodayLog(): Promise<DailyHealthLog | null> {
    const res = await axiosInstance.get(API_ENDPOINTS.HEALTH_TRACKING.DAILY_TODAY);
    return res.data.data;
  },

  async addWaterIntake(amountMl: number): Promise<DailyHealthLog> {
    const res = await axiosInstance.post(API_ENDPOINTS.HEALTH_TRACKING.WATER_INTAKE, { amountMl });
    return res.data.data;
  },

  // Milestones
  async getMilestones(): Promise<HealthMilestone[]> {
    const res = await axiosInstance.get(API_ENDPOINTS.HEALTH_TRACKING.MILESTONES);
    return res.data.data;
  },
};
