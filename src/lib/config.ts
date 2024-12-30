export const API_URL = 'http://localhost:8080';

export const AUTH_ENDPOINTS = {
    REFRESH_TOKEN: '/auth/refresh_token',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/me'
} as const;