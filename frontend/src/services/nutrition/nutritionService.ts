import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type {
    LogMealPayload,
    DailyTargetPayload,
    DayLogResponse,
    WeekLogResponse,
    MealType
} from "../../types/nutrition.types";

export const nutritionService = {
    /**
     * Log a meal for the authenticated user
     */
    async logMeal(payload: LogMealPayload): Promise<any> {
        const response = await axiosInstance.post(API_ENDPOINTS.MEALS.LOG, payload);
        return response.data.data;
    },

    /**
     * Fetch daily meal log and macro targets for a specific date (YYYY-MM-DD)
     */
    async getDayLog(date: string): Promise<DayLogResponse> {
        const response = await axiosInstance.get(API_ENDPOINTS.MEALS.DAY(date));
        return response.data.data;
    },

    /**
     * Fetch weekly meal logs starting from a specific date (YYYY-MM-DD)
     */
    async getWeekLogs(startDate: string): Promise<WeekLogResponse> {
        const response = await axiosInstance.get(API_ENDPOINTS.MEALS.WEEK(startDate));
        return response.data.data;
    },

    /**
     * Remove a logged meal by type (BREAKFAST, LUNCH, SNACK, DINNER)
     */
    async removeMeal(mealType: MealType): Promise<void> {
        await axiosInstance.delete(API_ENDPOINTS.MEALS.DELETE(mealType));
    },

    /**
     * Update user's daily calorie and macro target
     */
    async setDailyTarget(payload: DailyTargetPayload): Promise<DailyTargetPayload> {
        const response = await axiosInstance.put(API_ENDPOINTS.MEALS.TARGET, payload);
        return response.data.data;
    }
};
