import { create } from 'zustand';
import { borrowingService } from '../api/services/borrowing';

const useBorrowingStore = create((set) => ({
    borrowedBooks: [],
    createBorrowingBooks: [],
    returnedBooks: [],
    loading: false,
    error: null,

    createBorrowing: async (payload) => {
        try {
            set((state) => ({ loading: { ...state.loading, allBooks: true }, error: null }));
            const response = await borrowingService.createBorrowing(payload);
            // await new Promise(resolve => setTimeout(resolve, 2000));
            set((state) => ({
                borrowedBooks: [...state.borrowedBooks, response.borrowing],
            }));

            set((state) => ({ loading: false }));
        } catch (err) {
            set({ error: err.response?.data?.message || err.message, loading: false });
        }
    },

    getBorrowings: async () => {
        try {
            set((state) => ({ loading: true, error: null }));
            // await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await borrowingService.getBorrowings();
            set({ borrowedBooks: Array.isArray(response) ? response : [response] });

            set((state) => ({ loading: false }));
        } catch (err) {
            set((state) => ({ error: err.message, loading: { ...state.loading, allBooks: false } }));
        }
    },

    getHistoryBorrowings: async () => {
        try {
            set((state) => ({ loading: true, error: null }));

            const response = await borrowingService.getHistoryBorrowings();
            console.log(response);
            set({ returnedBooks: Array.isArray(response) ? response : [response] });

            set((state) => ({ loading: false }));
        } catch (err) {
            set((state) => ({ error: err.message, loading: false }));
        }
    },

    returnBorrowing: async (id) => {
        try {
            set((state) => ({
                loading: true,
                error: null,
            }));
            // await new Promise(resolve => setTimeout(resolve, 2000));
            const response = await borrowingService.returnBorrowing(id);

            set((state) => ({
                borrowedBooks: state.borrowedBooks.filter((b) => b.id !== id),
            }));

            await useBorrowingStore.getState().getBorrowings();

            set((state) => ({
                loading: false,
            }));
        } catch (err) {
            set((state) => ({
                error: err.response?.data?.message || err.message,
                loading: false,
            }));
        }
    },

    clearError: () => set({ error: null }),
}));

export default useBorrowingStore;
