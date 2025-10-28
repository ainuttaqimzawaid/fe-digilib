import { create } from 'zustand';
import { reviewService } from '../api/services/review';

const useReviewStore = create((set) => ({
    bookReviews: {},
    userReviews: [],
    loading: false,
    error: null,

    createReview: async (payload) => {
        try {
            set({ loading: true, error: null });
            const response = await reviewService.createReview(payload);

            set((state) => {
                const bookId = response.bookId;
                return {
                    bookReviews: {
                        ...state.bookReviews,
                        [bookId]: [...(state.bookReviews[bookId] || []), response],
                    },
                    userReviews: [...state.userReviews, response],
                };
            });

            set({ loading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || err.message, loading: false });
        }
    },

    updateReview: async (bookId, payload) => {
        try {
            set({ loading: true, error: null });
            const response = await reviewService.updateReview(bookId, payload);
            // console.log("Updated Review Response:", bookId, payload);

            set((state) => {
                const bookId = response.bookId;
                return {
                    bookReviews: {
                        ...state.bookReviews,
                        [bookId]: [...(state.bookReviews[bookId] || []), response],
                    },
                    userReviews: [...state.userReviews, response],
                };
            });

            set({ loading: false });
            return response;
        } catch (err) {
            set({ error: err.response?.data?.message || err.message, loading: false });
        }
    },

    getReviewsByBook: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await reviewService.getReviewsByBook(id);
            // console.log(response);

            set((state) => ({
                bookReviews: response
            }));

            set({ loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    getReviewsByUser: async () => {
        try {
            set({ loading: true, error: null });
            const response = await reviewService.getReviewsByUser();

            set({
                userReviews: Array.isArray(response) ? response : [response],
                loading: false,
            });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    clearError: () => set({ error: null }),
}));

export default useReviewStore;
