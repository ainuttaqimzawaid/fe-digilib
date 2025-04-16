import axios from 'axios';
import { config as appConfig } from '../../../config';

const baseURL = `${appConfig.api_host}`;

// Axios instance utama
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor Request – Tambahkan Authorization Header jika ada token
api.interceptors.request.use(
    (requestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            requestConfig.headers.Authorization = `Bearer ${token}`;
        }
        return requestConfig;
    },
    (error) => Promise.reject(error)
);

// Interceptor Response – Tangani Error & Redirect jika Unauthorized
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