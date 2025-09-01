import axios from 'axios';
import { config as appConfig } from '../../../config';

const baseURL = `${appConfig.api_host}`;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor Request – Tambah token + atur Content-Type otomatis
api.interceptors.request.use(
    (requestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        // Atur Content-Type ke multipart jika FormData
        if (requestConfig.data instanceof FormData) {
            requestConfig.headers['Content-Type'] = 'multipart/form-data';
        }

        return requestConfig;
    },
    (error) => Promise.reject(error)
);

// Interceptor Response – Tangani 401 (Unauthorized)
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        } else {
            console.error('API Error:', error.response || error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
