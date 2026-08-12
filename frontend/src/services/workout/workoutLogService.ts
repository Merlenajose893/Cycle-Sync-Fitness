import axiosInstance from "../../api/axios";

export interface LogWorkoutPayload {
  date?: string;
  source?: string;
  workoutProgramId?: string;
  workoutTitle: string;
  durationMinutes: number;
  caloriesBurned: number;
  notes?: string;
  imageUrl?: string;
  exercises?: any[];
}

export const workoutLogService = {
  async createLog(data: LogWorkoutPayload | FormData): Promise<any> {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    const response = await axiosInstance.post("/api/workout-logs", data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    });
    return response.data.data;
  },

  async getUserLogs(): Promise<any[]> {
    const response = await axiosInstance.get("/api/workout-logs/history");
    const data = response.data.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.logs)) return data.logs;
    return [];
  },

  async getClientLogsForTrainer(clientId: string): Promise<any[]> {
    const response = await axiosInstance.get(`/api/workout-logs/client/${clientId}`);
    return response.data.data;
  },
};
