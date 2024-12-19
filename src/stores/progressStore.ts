import { create } from 'zustand';
import api from '../lib/axios';
import { ProgressStatsDto, UserGoalDto } from '../types/progress';

interface ProgressStore {
    goals: UserGoalDto[];
    stats: Record<string, ProgressStatsDto>;
    loading: boolean;
    fetchGoals: () => Promise<void>;
    fetchStats: (metric: string) => Promise<void>;
    setGoal: (goal: UserGoalDto) => Promise<void>;
}

export const useProgressStore = create<ProgressStore>((set) => ({
    goals: [],
    stats: {},
    loading: false,

    fetchGoals: async () => {
        set({ loading: true });
        try {
            const response = await api.get<UserGoalDto[]>('/progress/goals');
            set({ goals: response.data });
        } finally {
            set({ loading: false });
        }
    },

    fetchStats: async (metric: string) => {
        const response = await api.get<ProgressStatsDto>(`/progress/stats/${metric}`);
        set((state) => ({
            stats: { ...state.stats, [metric]: response.data }
        }));
    },

    setGoal: async (goal: UserGoalDto) => {
        const response = await api.post<UserGoalDto>('/progress/goals', goal);
        set((state) => ({
            goals: [...state.goals, response.data]
        }));
    }
}));