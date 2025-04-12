import axios from "axios";
import { config } from "../../config";

export const getProducts = async (params) => {
    return await axios.get(`${config.api_host}/api/v2/book`, { params });
};

export const getCategories = async (params) => {
    return await axios.get(`${config.api_host}/api/v2/category`, { params });
}

export const getTagsByCategory = async (category) => {
    return await axios.get(`${config.api_host}/api/v2/tag/${category}`);
}