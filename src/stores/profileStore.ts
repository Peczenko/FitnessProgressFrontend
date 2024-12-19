import { create } from 'zustand';
import api from '../lib/axios';
import { UserProfileDto, UserProfileResponse } from '../types/auth';
import { useAuthStore } from './authStore';

interface ProfileStore {
    profile: UserProfileResponse | null;
    loading: boolean;
    initialized: boolean;
    fetchProfile: () => Promise<void>;
    updateProfile: (data: UserProfileDto) => Promise<void>;
    setProfile: (data: UserProfileResponse) => void;
    reset: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    profile: null,
    loading: false,
    initialized: false,

    setProfile: (data: UserProfileResponse) => {
        set({ profile: data, initialized: true });
    },

    reset: () => {
        set({ profile: null, initialized: false });
    },

    fetchProfile: async () => {
        set({ loading: true });
        try {
            const response = await api.get<UserProfileResponse>('/auth/me');
            if (response.data) {
                set({ profile: response.data, initialized: true });
                // Update auth store with user data
                useAuthStore.getState().setUser({
                    username: response.data.username,
                    email: response.data.email
                });
            } else {
                set({ profile: null, initialized: true });
            }
        } catch (error) {
            if(!(error instanceof Error)) {
                console.error('Error fetching profile data:', error);
            }
            set({ profile: null, initialized: true });
        } finally {
            set({ loading: false });
        }
    },

    updateProfile: async (data: UserProfileDto) => {
        set({ loading: true });
        try {
            await api.post<UserProfileResponse>('/auth/me', data);
            // After successful update, fetch the latest profile data
            await useProfileStore.getState().fetchProfile();
        } finally {
            set({ loading: false });
        }
    },
}));