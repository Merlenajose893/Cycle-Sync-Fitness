import axiosInstance from '../api/axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export interface ReportSummary {
  totalCalories: number;
  averageDailyCalories: number;
  calorieTargetAdherence: number;
  totalWorkoutSessions: number;
  totalWorkoutVolume: number;
  totalWorkoutSets: number;
  workoutConsistency: number;
  startingWeight: number | null;
  currentWeight: number | null;
  weightChange: number | null;
}

export interface CalorieDataPoint {
  date: string;
  caloriesConsumed: number;
  calorieTarget: number;
}

export interface MacroDataPoint {
  date: string;
  protein: number;
  carbohydrates: number;
  fats: number;
}

export interface WorkoutDataPoint {
  date: string;
  totalVolume: number;
  totalSets: number;
  workoutCompleted: boolean;
}

export interface WeightCycleDataPoint {
  date: string;
  weight: number | null;
  cycleDay: number | null;
  cyclePhase: string | null;
}

export interface ReportAnalytics {
  range: 'week' | 'month' | '3months';
  startDate: string;
  endDate: string;
  summary: ReportSummary;
  calorieSeries: CalorieDataPoint[];
  macroSeries: MacroDataPoint[];
  workoutSeries: WorkoutDataPoint[];
  weightCycleSeries: WeightCycleDataPoint[];
}

export const reportService = {
  async getReportAnalytics(range: string): Promise<ReportAnalytics> {
    const response = await axiosInstance.get(API_ENDPOINTS.REPORTS.ANALYTICS(range));
    return response.data.data;
  },

  async downloadReportExport(range: string): Promise<void> {
    const response = await axiosInstance.get(API_ENDPOINTS.REPORTS.EXPORT(range), {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `health_report_${range}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};
