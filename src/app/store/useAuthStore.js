import { create } from 'zustand';
import { authService } from '../api/services/auth';

export const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,

    // ✅ LOGIN
    login: async (credentials) => {
        set({ loading: true });
        try {
            const data = await authService.login(credentials);

            if (data.error) throw new Error(data.message || 'Login failed');

            if (data.user && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                set({ user: data.user, error: null });
            }

            return data;
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || 'Login failed';
            set({ error: message });
            throw new Error(message);
        } finally {
            set({ loading: false });
        }
    },

    // ✅ REGISTER
    register: async (userData) => {
        set({ loading: true });
        try {
            const data = await authService.register(userData);
            set({ error: null });
            return data;
        } catch (err) {
            set({ error: err.message || 'Registration failed' });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    // ✅ GET CURRENT USER (Optional dipanggil saat mount untuk verifikasi token)
    getCurrentUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        set({ loading: true });
        try {
            const response = await authService.getCurrentUser(token);
            const user = response.data?.user;

            if (user) {
                set({ user, error: null });
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        } catch (err) {
            set({ error: err.message || 'Gagal mendapatkan data pengguna' });
            return null;
        } finally {
            set({ loading: false });
        }
    },

    // ✅ UPDATE PROFILE
    updateProfile: async (userData) => {
        set({ loading: true });
        try {
            const data = await authService.updateProfile(userData);
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                set({ user: data.user, error: null });
            }
            return data;
        } catch (err) {
            set({ error: err.message || 'Update profile gagal' });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    // ✅ CHANGE PASSWORD
    changePassword: async (passwordData) => {
        set({ loading: true });
        try {
            const data = await authService.changePassword(passwordData);
            set({ error: null });
            return data;
        } catch (err) {
            set({ error: err.message || 'Gagal mengganti password' });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    // ✅ LOGOUT
    logout: async () => {
        try {
            await authService.logout();
        } catch (_) { }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, error: null });
    },

    // ✅ AUTH CHECK
    isAuthenticated: () => !!get().user,

    // ✅ CLEAR ERROR
    clearError: () => set({ error: null }),
}));
