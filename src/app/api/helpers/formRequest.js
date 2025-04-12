import api from '../axios/index';

export const postFormData = (url, formData) => {
    return api.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const putFormData = (url, formData) => {
    return api.put(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
