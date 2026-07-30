import { useState, useCallback } from 'react';
import { workoutProgramService } from '../../services/workout/workoutProgramService';
import type {
  WorkoutProgram,
  CreateProgramPayload,
  UpdateProgramPayload,
} from '../../types/workout.types';

export const useWorkoutProgram = () => {
  const [activeProgram, setActiveProgram] = useState<WorkoutProgram | null>(null);
  const [trainerPrograms, setTrainerPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveProgram = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const prog = await workoutProgramService.getUserActiveProgram();
      setActiveProgram(prog);
      return prog;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch active workout program';
      setError(msg);
      setActiveProgram(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrainerPrograms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const progs = await workoutProgramService.getTrainerPrograms();
      setTrainerPrograms(progs);
      return progs;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch trainer workout programs';
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createProgram = async (payload: CreateProgramPayload) => {
    setLoading(true);
    setError(null);
    try {
      const newProg = await workoutProgramService.createProgram(payload);
      setTrainerPrograms((prev) => [newProg, ...prev]);
      return newProg;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to create workout program';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const updateProgram = async (id: string, payload: UpdateProgramPayload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await workoutProgramService.updateProgram(id, payload);
      setTrainerPrograms((prev) => prev.map((p) => (p._id === id ? updated : p)));
      return updated;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update workout program';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const deleteProgram = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await workoutProgramService.deleteProgram(id);
      setTrainerPrograms((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete workout program';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const assignProgram = async (id: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await workoutProgramService.assignProgram(id, userId);
      setTrainerPrograms((prev) => prev.map((p) => (p._id === id ? updated : p)));
      return updated;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to assign workout program';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    activeProgram,
    trainerPrograms,
    loading,
    error,
    fetchActiveProgram,
    fetchTrainerPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
    assignProgram,
  };
};
