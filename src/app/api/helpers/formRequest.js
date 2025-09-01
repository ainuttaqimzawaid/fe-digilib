import api from '../axios/index';

export const postFormData = (url, formData) => {
    return api.post(url, formData); // Header akan otomatis diatur
};

export const putFormData = (url, formData) => {
    return api.put(url, formData);
};
