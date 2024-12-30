import axios from 'axios';
import { API_URL, AUTH_ENDPOINTS } from '../config';
import { RefreshTokenResponse } from '../../types/auth';

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

export async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
        if (refreshPromise) {
            return await refreshPromise;
        }

        refreshPromise = axios
            .post<RefreshTokenResponse>(`${API_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, { refreshToken })
            .then((response) => response.data);

        return await refreshPromise;
    } finally {
        setTimeout(() => {
            refreshPromise = null;
        }, 1000);
    }
}