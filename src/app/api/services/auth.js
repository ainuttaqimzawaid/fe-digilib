import api from '../axios/index';


export const authService = {
    async login(credentials) {
        const response = await api.post('/auth/login', credentials);
        return response;
    },

    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async getCurrentUser(token) {
        const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res;
    },

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },


    // async updateProfile(userData) {
    //     const response = await api.put('/auth/profile', userData);
    //     if (response.data.user) {
    //         localStorage.setItem('user', JSON.stringify(response.data.user));
    //     }
    //     return response.data;
    // },

    // async changePassword(passwordData) {
    //     const response = await api.put('/auth/change-password', passwordData);
    //     return response.data;
    // },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}; 