import { config } from "../../../config";
import api from '../axios/index';



export const reviewService = {
    createReview: async (payload) => {
        const data = await api.post(`${config.api_host}/api/v2/reviews`, payload);
        return data;
    },

    getReviewsByBook: async (id) => {
        const data = await api.get(`${config.api_host}/api/v2/reviews/book/${id}`);
        return data;
    },

    getReviewsByUser: async () => {
        const data = await api.get(`${config.api_host}/api/v2/reviews/user`);
        return data;
    },
}