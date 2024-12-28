import { create } from 'zustand';
import api from '../lib/axios';
import {
    GoalProgressDto,
    TimelineProgressDto,
    CommonProgressMapDto
} from '../types/progress';

interface ProgressStore {
    goalProgress: GoalProgressDto | null;
    timelineProgress: TimelineProgressDto;
    commonProgress: CommonProgressMapDto;
    loading: boolean;
    fetchGoalProgress: (goalId: number) => Promise<GoalProgressDto>;
    fetchTimelineProgress: (goalId: number) => Promise<void>;
    fetchCommonProgress: () => Promise<void>;
}

export const useProgressStore = create<ProgressStore>((set) => ({
    goalProgress: null,
    timelineProgress: {},
    commonProgress: {},
    loading: false,

    fetchGoalProgress: async (goalId: number) => {
        set({ loading: true });
        try {
            const response = await api.get<GoalProgressDto>(`/progress/goal/${goalId}`);
            set({ goalProgress: response.data });
            return response.data;
        } finally {
            set({ loading: false });
        }
    },

    fetchTimelineProgress: async (goalId: number) => {
        const response = await api.get<TimelineProgressDto>(`/progress/goal/${goalId}/timeline`);
        set({ timelineProgress: response.data });
    },

    fetchCommonProgress: async () => {
        const response = await api.get<CommonProgressMapDto>('/progress/common');
        set({ commonProgress: response.data });
    },
}));