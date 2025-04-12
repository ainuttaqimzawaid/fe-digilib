import { create } from 'zustand';
import { authService } from '../services/auth/authService';

const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,

    // Initialize auth state
    initialize: async () => {
        try {
            set({ loading: true });
            const user = await authService.getCurrentUser();
            set({
                user,
                isAuthenticated: !!user,
                loading: false
            });
        } catch (error) {
            set({
                error: error.message || 'Failed to initialize auth',
                loading: false
            });
        }
    },

    // Login
    login: async (credentials) => {
        try {
            set({ loading: true, error: null });
            const data = await authService.login(credentials);
            set({
                user: data.user,
                isAuthenticated: true,
                loading: false
            });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Login failed',
                loading: false
            });
            throw error;
        }
    },

    // Register
    register: async (userData) => {
        try {
            set({ loading: true, error: null });
            const data = await authService.register(userData);
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Registration failed',
                loading: false
            });
            throw error;
        }
    },

    // Logout
    logout: async () => {
        try {
            set({ loading: true, error: null });
            await authService.logout();
            set({
                user: null,
                isAuthenticated: false,
                loading: false
            });
        } catch (error) {
            set({
                error: error.message || 'Logout failed',
                loading: false
            });
            throw error;
        }
    },

    // Update profile
    updateProfile: async (userData) => {
        try {
            set({ loading: true, error: null });
            const data = await authService.updateProfile(userData);
            set({
                user: data.user,
                loading: false
            });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Profile update failed',
                loading: false
            });
            throw error;
        }
    },

    // Change password
    changePassword: async (passwordData) => {
        try {
            set({ loading: true, error: null });
            const data = await authService.changePassword(passwordData);
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Password change failed',
                loading: false
            });
            throw error;
        }
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useAuthStore; 