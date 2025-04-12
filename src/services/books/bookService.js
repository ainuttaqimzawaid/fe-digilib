import api from '../api/config';

const bookService = {
    // Get all books
    getAllBooks: async (params = {}) => {
        try {
            const response = await api.get('/book', { params });
            return response.rows || [];
        } catch (error) {
            throw error;
        }
    },

    // Get book by ID
    getBookById: async (id) => {
        try {
            const response = await api.get(`/book/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get featured books (books with status true)
    getFeaturedBooks: async () => {
        try {
            const response = await api.get('/book', { params: { status: true } });
            return response.rows || [];
        } catch (error) {
            throw error;
        }
    },

    // Get books by category
    getBooksByCategory: async (categoryId, params = {}) => {
        try {
            const response = await api.get('/book', {
                params: {
                    ...params,
                    categoryId
                }
            });
            return response.rows || [];
        } catch (error) {
            throw error;
        }
    },

    // Search books
    searchBooks: async (query, params = {}) => {
        try {
            const response = await api.get('/book', {
                params: {
                    ...params,
                    search: query
                }
            });
            return response.rows || [];
        } catch (error) {
            throw error;
        }
    },

    // Get book reviews
    getBookReviews: async (bookId) => {
        try {
            const response = await api.get(`/book/${bookId}/reviews`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Add book review
    addBookReview: async (bookId, reviewData) => {
        try {
            const response = await api.post(`/book/${bookId}/reviews`, reviewData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Get reading history
    getReadingHistory: async () => {
        try {
            const response = await api.get('/reading-history');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Add to reading list
    addToReadingList: async (bookId) => {
        try {
            const response = await api.post('/reading-list', { bookId });
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Remove from reading list
    removeFromReadingList: async (bookId) => {
        try {
            const response = await api.delete(`/reading-list/${bookId}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default bookService; 