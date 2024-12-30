import { create } from 'zustand';
import api from '../lib/axios';
import { JwtResponse, LoginDto, RegisterDto, UserDto } from '../types/auth';
import { useProfileStore } from './profileStore';
import { AUTH_ENDPOINTS } from '../lib/config';

interface AuthStore {
  isAuthenticated: boolean;
  user: UserDto | null;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  setUser: (user: UserDto) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem('accessToken'),
  user: null,

  setUser: (user: UserDto) => {
    set({ user });
  },

  login: async (data) => {
    const response = await api.post<JwtResponse>(AUTH_ENDPOINTS.LOGIN, data);
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      set({ isAuthenticated: true });
      await useProfileStore.getState().fetchProfile();
    }
  },

  register: async (data) => {
    await api.post(AUTH_ENDPOINTS.REGISTER, data);
  },

  logout: async () => {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT);
    }catch (e){
      console.error("Logout error: ", e);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ isAuthenticated: false, user: null });
    useProfileStore.getState().reset();
  },
}));