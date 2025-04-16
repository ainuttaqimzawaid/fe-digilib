import { create } from 'zustand';
import categoryService from '../api/services/category';

const useCategoryStore = create((set) => ({
    categories: [],
    currentCategory: null,
    categoryBooks: [],
    loading: false,
    error: null,

    // Get all categories
    getAllCategories: async () => {
        try {
            set({ loading: true, error: null });
            const data = await categoryService.getAllCategories();
            set({ categories: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch categories',
                loading: false
            });
            throw error;
        }
    },

    // Get category by ID
    getCategoryById: async (id) => {
        try {
            set({ loading: true, error: null });
            const data = await categoryService.getCategoryById(id);
            set({ currentCategory: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch category',
                loading: false
            });
            throw error;
        }
    },

    // Get books by category
    getBooksByCategory: async (categoryId) => {
        try {
            set({ loading: true, error: null });
            const data = await categoryService.getBooksByCategory(categoryId);
            set({ categoryBooks: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch category books',
                loading: false
            });
            throw error;
        }
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useCategoryStore; 