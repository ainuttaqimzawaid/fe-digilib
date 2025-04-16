import axios from "axios";
import { config } from "../../../config";

export const getProducts = async (params) => {
    return await axios.get(`${config.api_host}/api/v2/book`, { params });
};

export const getCategories = async (params) => {
    return await axios.get(`${config.api_host}/api/v2/category`, { params });
}

export const getTagsByCategory = async (category) => {
    return await axios.get(`${config.api_host}/api/v2/tag/${category}`);
}



import api from '../index';
import { postFormData, putFormData } from '../helpers/formRequest';

export const getAllBooks = () => api.get('/books');

export const getBookById = (id) => api.get(`/books/${id}`);

export const createBook = (formData) => postFormData('/books', formData);

export const updateBook = (id, formData) => putFormData(`/books/${id}`, formData);

export const deleteBook = (id) => api.delete(`/books/${id}`);
