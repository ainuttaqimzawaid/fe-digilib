import api from '../axios/index';


const categoryService = {
    // Get all categories
    getAllCategories: async (params) => {
        try {
            const response = await api.get('/api/v2/category', { params });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get category by ID
    getCategoryById: async (id) => {
        try {
            const response = await api.get(`/category/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get books by category
    getBooksByCategory: async (categoryId) => {
        try {
            const response = await api.get('/book', {
                params: { categoryId }
            });
            return response.rows || [];
        } catch (error) {
            throw error;
        }
    },

    async getPopularCategories() {
        const response = await api.get('/categories/popular');
        return response.data;
    },

    async getCategoryWithBooks(id, params = {}) {
        const response = await api.get(`/categories/${id}/books`, { params });
        return response.data;
    },

    async createCategory(categoryData) {
        const response = await api.post('/categories', categoryData);
        return response.data;
    },

    async updateCategory(id, categoryData) {
        const response = await api.put(`/categories/${id}`, categoryData);
        return response.data;
    },

    async deleteCategory(id) {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    }
};

export default categoryService; 