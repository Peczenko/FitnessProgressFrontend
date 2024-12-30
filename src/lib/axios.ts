import axios from 'axios';
import { toast } from 'react-hot-toast';
import { refreshAccessToken } from './auth/refreshToken';
import { API_URL, AUTH_ENDPOINTS } from './config';
import {useAuthStore} from "../stores/authStore.ts";
import {handleSessionExpiration} from "./auth/sessionManeger.ts";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    if (config.url === AUTH_ENDPOINTS.REFRESH_TOKEN) {
        return config;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            if (originalRequest.url === AUTH_ENDPOINTS.REFRESH_TOKEN) {
                useAuthStore.getState().logout();
                toast.error('Session expired. Please log in again.');
                window.location.replace('/login');
                return Promise.reject(error);
            }

            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    const { accessToken } = await refreshAccessToken(refreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    handleSessionExpiration()
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);


export default api;