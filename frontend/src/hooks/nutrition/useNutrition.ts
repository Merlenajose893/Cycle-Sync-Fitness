import { useState, useCallback } from "react";
import axios from "axios";
import { nutritionService } from "../../services/nutrition/nutritionService";
import type {
    LogMealPayload,
    DailyTargetPayload,
    DayLogResponse,
    WeekLogResponse,
    MealType
} from "../../types/nutrition.types";

export const useNutrition = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dayLog, setDayLog] = useState<DayLogResponse | null>(null);
    const [weekLogs, setWeekLogs] = useState<WeekLogResponse | null>(null);

    const fetchDayLog = useCallback(async (date: string): Promise<DayLogResponse | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const data = await nutritionService.getDayLog(date);
            setDayLog(data);
            return data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || "Failed to fetch day log");
            } else {
                setError("Unexpected error occurred while fetching day log");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWeekLogs = useCallback(async (startDate: string): Promise<WeekLogResponse | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const data = await nutritionService.getWeekLogs(startDate);
            setWeekLogs(data);
            return data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || "Failed to fetch week logs");
            } else {
                setError("Unexpected error occurred while fetching week logs");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const logMeal = useCallback(async (payload: LogMealPayload): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await nutritionService.logMeal(payload);
            return true;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || "Failed to log meal");
            } else {
                setError("Unexpected error occurred while logging meal");
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const removeMeal = useCallback(async (mealType: MealType): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await nutritionService.removeMeal(mealType);
            return true;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || "Failed to delete meal");
            } else {
                setError("Unexpected error occurred while deleting meal");
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateDailyTarget = useCallback(async (payload: DailyTargetPayload): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            await nutritionService.setDailyTarget(payload);
            return true;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || "Failed to update daily targets");
            } else {
                setError("Unexpected error occurred while updating targets");
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        dayLog,
        weekLogs,
        fetchDayLog,
        fetchWeekLogs,
        logMeal,
        removeMeal,
        updateDailyTarget,
    };
};
