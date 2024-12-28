import { create } from 'zustand';
import api from '../lib/axios';
import { GoalDto, CreateGoalDto, UpdateGoalDto } from '../types/goal';
import { useProgressStore } from './progressStore';

interface GoalStore {
    goals: GoalDto[];
    customDescriptions: string[];
    loading: boolean;
    fetchGoals: () => Promise<void>;
    fetchCustomDescriptions: () => Promise<void>;
    createGoal: (goal: CreateGoalDto) => Promise<void>;
    updateGoal: (id: number, goal: UpdateGoalDto) => Promise<void>;
    deleteGoal: (id: number) => Promise<void>;
    checkGoalAchievements: () => Promise<void>;
}

export const useGoalStore = create<GoalStore>((set, get) => ({
    goals: [],
    customDescriptions: [],
    loading: false,

    fetchGoals: async () => {
        set({ loading: true });
        try {
            const response = await api.get<GoalDto[]>('/goals');
            set({ goals: response.data });
            // Check achievements after fetching goals
            await get().checkGoalAchievements();
        } finally {
            set({ loading: false });
        }
    },

    fetchCustomDescriptions: async () => {
        const response = await api.get<string[]>('/workouts/get/custom-type');
        set({ customDescriptions: response.data });
    },

    createGoal: async (goal) => {
        const response = await api.post<GoalDto>('/goals/add', goal);
        set((state) => ({ goals: [...state.goals, { ...response.data, achieved: false }] }));
    },

    updateGoal: async (id, goal) => {
        const response = await api.put<GoalDto>(`/goals/${id}`, goal);
        set((state) => ({
            goals: state.goals.map((g) => (g.id === id ? { ...response.data, achieved: g.achieved } : g)),
        }));
    },

    deleteGoal: async (id) => {
        await api.delete(`/goals/${id}`);
        set((state) => ({
            goals: state.goals.filter((g) => g.id !== id),
        }));
    },

    checkGoalAchievements: async () => {
        const { goals } = get();
        const { fetchGoalProgress } = useProgressStore.getState();

        const updatedGoals = await Promise.all(
            goals.map(async (goal) => {
                try {
                    const progress = await fetchGoalProgress(goal.id);
                    return {
                        ...goal,
                        achieved: progress.weightGoalProgressPct >= 100 && progress.repsGoalProgressPct >= 100
                    };
                } catch (error) {
                    console.error(`Failed to fetch progress for goal ${goal.id}:`, error);
                    return { ...goal, achieved: false };
                }
            })
        );

        set({ goals: updatedGoals });
    },
}));