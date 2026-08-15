import { useState, useEffect, useCallback } from 'react';
import { useWorkoutLog } from './useWorkoutLog';

export interface ExerciseInsights {
    workoutsThisWeek: number;
    weeklyVolumeKg: number;
    lastWorkoutTitle: string | null;
    lastWorkoutDate: string | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useExerciseInsights = (): ExerciseInsights => {
    const { fetchHistory, loading, error } = useWorkoutLog();
    const [insights, setInsights] = useState({
        workoutsThisWeek: 0,
        weeklyVolumeKg: 0,
        lastWorkoutTitle: null as string | null,
        lastWorkoutDate: null as string | null,
    });

    const loadExerciseInsights = useCallback(async () => {
        try {
            const res = await fetchHistory(1, 30);
            if (res && res.logs) {
                const logs = res.logs;
                const now = new Date();
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

                const recentLogs = logs.filter(log => {
                    const logDate = new Date(log.date);
                    return logDate >= sevenDaysAgo;
                });

                const totalVolume = recentLogs.reduce((acc, log) => {
                    if (log.totalVolumeKg) return acc + log.totalVolumeKg;
                    const logVol = log.exercises?.reduce((eAcc, ex) => {
                        return eAcc + (ex.sets?.reduce((sAcc, s) => sAcc + (s.weightKg * s.repsCompleted), 0) || 0);
                    }, 0) || 0;
                    return acc + logVol;
                }, 0);

                const lastLog = logs[0] || null;

                setInsights({
                    workoutsThisWeek: recentLogs.length,
                    weeklyVolumeKg: Math.round(totalVolume),
                    lastWorkoutTitle: lastLog ? lastLog.workoutTitle : null,
                    lastWorkoutDate: lastLog ? lastLog.date : null,
                });
            }
        } catch (err) {
            console.error("Failed to fetch exercise insights", err);
        }
    }, [fetchHistory]);

    useEffect(() => {
        loadExerciseInsights();
    }, [loadExerciseInsights]);

    return {
        ...insights,
        loading,
        error,
        refetch: loadExerciseInsights,
    };
};
