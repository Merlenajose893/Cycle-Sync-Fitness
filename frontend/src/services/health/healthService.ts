import api from '../auth/api';
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
    const res = await api.post('/health/cycle/start', dto);
    return res.data.data;
  },

  async endPeriod(logId: string, dto: EndPeriodDTO): Promise<CycleLog> {
    const res = await api.put(`/health/cycle/${logId}/end`, dto);
    return res.data.data;
  },

  async getCycleLogs(): Promise<CycleLog[]> {
    const res = await api.get('/health/cycle/logs');
    return res.data.data;
  },

  async getPredictions(): Promise<CyclePrediction> {
    const res = await api.get('/health/cycle/predictions');
    return res.data.data;
  },

  async deleteCycleLog(logId: string): Promise<void> {
    await api.delete(`/health/cycle/${logId}`);
  },

  // Daily Health & Water
  async logDailyHealth(dto: CreateHealthLogDTO): Promise<DailyHealthLog> {
    const res = await api.post('/health/daily', dto);
    return res.data.data;
  },

  async getTodayLog(): Promise<DailyHealthLog | null> {
    const res = await api.get('/health/daily/today');
    return res.data.data;
  },

  async addWaterIntake(amountMl: number): Promise<DailyHealthLog> {
    const res = await api.post('/health/daily/water', { amountMl });
    return res.data.data;
  },

  // Milestones
  async getMilestones(): Promise<HealthMilestone[]> {
    const res = await api.get('/health/milestones');
    return res.data.data;
  },
};
