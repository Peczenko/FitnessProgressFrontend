import { create } from 'zustand';
import api from '../lib/axios';
import { WorkoutDto } from '../types/workout';

interface WorkoutStore {
  workouts: WorkoutDto[];
  loading: boolean;
  fetchWorkouts: () => Promise<void>;
  getWorkout: (id: number) => Promise<WorkoutDto>;
  createWorkout: (workout: Omit<WorkoutDto, 'id' | 'createdAt' | 'userDto'>) => Promise<void>;
  updateWorkout: (id: number, workout: Omit<WorkoutDto, 'id' | 'createdAt' | 'userDto'>) => Promise<void>;
  deleteWorkout: (id: number) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  loading: false,
  
  fetchWorkouts: async () => {
    set({ loading: true });
    try {
      const response = await api.get<WorkoutDto[]>('/workouts');
      set({ workouts: response.data });
    } finally {
      set({ loading: false });
    }
  },

  getWorkout: async (id) => {
    const response = await api.get<WorkoutDto>(`/workouts/${id}`);
    return response.data;
  },
  
  createWorkout: async (workout) => {
    const response = await api.post<WorkoutDto>('/workouts/add', workout);
    set((state) => ({ workouts: [...state.workouts, response.data] }));
  },
  
  updateWorkout: async (id, workout) => {
    const response = await api.put<WorkoutDto>(`/workouts/${id}`, workout);
    set((state) => ({
      workouts: state.workouts.map((w) => (w.id === id ? response.data : w)),
    }));
  },
  
  deleteWorkout: async (id) => {
    await api.delete(`/workouts/${id}`);
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== id),
    }));
  },
}));