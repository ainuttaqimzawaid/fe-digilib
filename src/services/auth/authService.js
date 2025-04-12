import api from '../api/config';

export const authService = {
    async login(credentials) {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    async getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    async updateProfile(userData) {
        const response = await api.put('/auth/profile', userData);
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async changePassword(passwordData) {
        const response = await api.put('/auth/change-password', passwordData);
        return response.data;
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}; 