import axios from "axios";
import { config } from "../../../config";
import api from '../axios/index';
import { postFormData, putFormData } from '../helpers/formRequest';



export const bookService = {
    getAllBooks: async (params) => {
        const data = await axios.get(`${config.api_host}/api/v2/book`, { params });
        // console.log(params);
        return data.data;
    },

    getFavoriteBooks: async (params) => {
        const data = await axios.get(`${config.api_host}/api/v2/book/favorite`, { params });
        return data.data;
    },

    getNewArrival: async (params) => {
        const data = await axios.get(`${config.api_host}/api/v2/book/new-arrival`, { params });
        return data.data;
    },

    getNewRelease: async (params) => {
        const data = await axios.get(`${config.api_host}/api/v2/book/new-release`, { params });
        return data.data;
    },

    getBookById: async (id) => {
        const data = await axios.get(`${config.api_host}/api/v2/book/${id}`);
        return data.data;
    },

    getCategories: async (params) => {
        return await axios.get(`${config.api_host}/api/v2/category`, { params });
    },
    getTagsByCategory: async (category) => {
        return await axios.get(`${config.api_host}/api/v2/tag/${category}`);
    },
}