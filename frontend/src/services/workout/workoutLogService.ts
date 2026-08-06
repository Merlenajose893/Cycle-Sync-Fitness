import axiosInstance from "../../api/axios";

export interface LogWorkoutPayload {
  workoutProgramId?: string;
  workoutTitle: string;
  durationMinutes: number;
  caloriesBurned: number;
  notes?: string;
}

export const workoutLogService = {
  async createLog(data: LogWorkoutPayload): Promise<any> {
    const response = await axiosInstance.post("/api/workout-logs", data);
    return response.data.data;
  },

  async getUserLogs(): Promise<any[]> {
    const response = await axiosInstance.get("/api/workout-logs/history");
    return response.data.data;
  },

  async getClientLogsForTrainer(clientId: string): Promise<any[]> {
    const response = await axiosInstance.get(`/api/workout-logs/client/${clientId}`);
    return response.data.data;
  },
};
