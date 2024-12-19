import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only handle 401 for authenticated requests (when token exists)
        if (error.response?.status === 401 && localStorage.getItem('token')) {
            localStorage.removeItem('token');
            useAuthStore.getState().logout();
            toast.error('Session expired. Please login again.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;