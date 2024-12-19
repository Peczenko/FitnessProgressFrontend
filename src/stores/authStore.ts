import { create } from 'zustand';
import api from '../lib/axios';
import { JwtResponse, LoginDto, RegisterDto, UserDto } from '../types/auth';
import { useProfileStore } from './profileStore';

interface AuthStore {
  isAuthenticated: boolean;
  user: UserDto | null;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  setUser: (user: UserDto) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,

  setUser: (user: UserDto) => {
    set({ user });
  },

  login: async (data) => {
    const response = await api.post<JwtResponse>('/auth/login', data);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      set({ isAuthenticated: true });
      await useProfileStore.getState().fetchProfile();
    }
  },

  register: async (data) => {
    const response = await api.post<JwtResponse>('/auth/register', data);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      set({ isAuthenticated: true });
      await useProfileStore.getState().fetchProfile();
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, user: null });
    useProfileStore.getState().reset();
  },
}));