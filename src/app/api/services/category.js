import api from '../axios/index';

export const getCategories = async (params) => {
    return await api.get('/api/v2/category', { params });
}
export const getCategoryById = (id) => api.get(`/api/v2/category/${id}`);
export const createCategory = (data) => api.post('/api/v2/category', data);
export const updateCategory = (id, data) => api.put(`/api/v2/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/api/v2/category/${id}`);
