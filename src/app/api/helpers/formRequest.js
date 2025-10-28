import api from '../axios/index';

export const postFormData = (url, formData) => {
    return api.post(url, formData); // Header auto setting
};

export const putFormData = (url, formData) => {
    return api.put(url, formData);
};
