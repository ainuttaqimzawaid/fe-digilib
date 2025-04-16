import { useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            const data = await authService.login(credentials);
            setUser(data.user);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const data = await authService.register(userData);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setError(null);
        } catch (err) {
            setError(err.message || 'Logout failed');
            throw err;
        }
    };

    const updateProfile = async (userData) => {
        try {
            setLoading(true);
            const data = await authService.updateProfile(userData);
            setUser(data.user);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Profile update failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (passwordData) => {
        try {
            setLoading(true);
            const data = await authService.changePassword(passwordData);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message || 'Password change failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: authService.isAuthenticated()
    };
}; 