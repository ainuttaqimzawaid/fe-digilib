import api from '../axios/index';
// import { config } from "../../../config";

export const queueService = {
    // User daftar antrean
    add: async (payload) => {
        const response = await api.post('/api/v2/queue', payload);
        return response;
    },

    // Ambil daftar antrean user sendiri
    async getMine() {
        const response = await api.get('/api/v2/queue');
        return response;
    },

    // Batal antre
    cancel: async (id) => {
        const response = await api.delete(`/api/v2/queue/${id}`);
        return response;
    },
};
