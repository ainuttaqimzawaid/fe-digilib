import api from '../axios/index';


const categoryService = {
    // Get all categories
    getAll: async (params) => {
        const data = await api.get('/api/v2/category', { params });
        return data;
    },

    // Get category by ID
    getById: async (id) => {
        const data = await api.get(`/category/${id}`);
        return data;
    },

    // Get books by category
    getBooks: async (categoryId) => {
        const response = await api.get('/book', { params: { categoryId } });
        return response.rows || [];
    },

    // async createCategory(categoryData) {
    //     const response = await api.post('/categories', categoryData);
    //     return response.data;
    // },

    // async updateCategory(id, categoryData) {
    //     const response = await api.put(`/categories/${id}`, categoryData);
    //     return response.data;
    // },

    // async deleteCategory(id) {
    //     const response = await api.delete(`/categories/${id}`);
    //     return response.data;
    // }
};

export default categoryService; 