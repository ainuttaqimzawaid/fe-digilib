import { config } from "../../../config";
import api from '../axios/index';

export const borrowingService = {
    createBorrowing: async (payload) => {
        const data = await api.post(`${config.api_host}/api/v2/borrowbook`, payload);
        return data;
    },

    getBorrowings: async (params) => {
        const data = await api.get(`${config.api_host}/api/v2/borrowings/active`, { params });
        return data;
    },

    getHistoryBorrowings: async (params) => {
        const data = await api.get(`${config.api_host}/api/v2/borrowings/history`, { params });
        return data;
    },

    returnBorrowing: async (id) => {
        const data = await api.put(`${config.api_host}/api/v2/returnbook/${id}`);
        return data;
    }
}