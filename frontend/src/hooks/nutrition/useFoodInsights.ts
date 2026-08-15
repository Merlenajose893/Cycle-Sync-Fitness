import { useState, useEffect, useCallback } from 'react';
import { useNutrition } from './useNutrition';

export interface FoodInsights {
    consumedCalories: number;
    targetCalories: number;
    remainingCalories: number;
    percentage: number;
    protein: number;
    carbs: number;
    fat: number;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useFoodInsights = (): FoodInsights => {
    const { fetchDayLog, loading, error } = useNutrition();
    const [insights, setInsights] = useState({
        consumedCalories: 0,
        targetCalories: 2000,
        remainingCalories: 2000,
        percentage: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
    });

    const loadFoodInsights = useCallback(async () => {
        const today = new Date().toISOString().split('T')[0];
        try {
            const data = await fetchDayLog(today);
            if (data) {
                const consumed = data.summary?.totalCalories || 0;
                const target = data.target?.calories || 2000;
                const remaining = Math.max(0, target - consumed);
                const pct = Math.min(100, Math.round((consumed / (target || 1)) * 100));

                setInsights({
                    consumedCalories: consumed,
                    targetCalories: target,
                    remainingCalories: remaining,
                    percentage: pct,
                    protein: data.summary?.totalProtein || 0,
                    carbs: data.summary?.totalCarbs || 0,
                    fat: data.summary?.totalFat || 0,
                });
            }
        } catch (err) {
            console.error("Failed to fetch food insights", err);
        }
    }, [fetchDayLog]);

    useEffect(() => {
        loadFoodInsights();
    }, [loadFoodInsights]);

    return {
        ...insights,
        loading,
        error,
        refetch: loadFoodInsights,
    };
};
