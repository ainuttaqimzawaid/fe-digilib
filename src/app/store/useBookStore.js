import { create } from 'zustand';
import { bookService } from '../api/services/book';

const useBookStore = create((set) => ({
    allBooks: [],
    favoriteBooks: [],
    newArrival: [],
    newRelease: [],
    categoryBooks: [],
    currentBook: null,
    loading: false,
    loading: {
        allBooks: false,
        favoriteBooks: false,
        newArrival: false,
        newRelease: false,
        categoryBooks: false,
        currentBook: false,
    },
    error: null,

    // Get all books
    getAllBooks: async (params = {}) => {
        try {
            set((state) => ({
                loading: true,
                error: null
            }));
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await bookService.getAllBooks(params);
            console.log(data);
            set((state) => ({
                allBooks: data,
                loading: false,
            }));
            return data;
        } catch (error) {
            set((state) => ({
                error: error.message || 'Failed to fetch books',
                loading: false
            }));
            throw error;
        }
    },

    getFavoriteBooks: async (params = {}) => {
        try {
            set((state) => ({
                loading: true,
                error: null
            }));
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await bookService.getFavoriteBooks(params);
            set((state) => ({
                favoriteBooks: data,
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch books',
                loading: false
            });
            throw error;
        }
    },

    getNewArrival: async (params = {}) => {
        try {
            set((state) => ({
                loading: true,
                error: null
            }));
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await bookService.getNewArrival(params);
            set((state) => ({
                newArrival: data,
                loading: false,
            }));
        } catch (error) {
            set((state) => ({
                loading: true,
                error: error.message || 'Failed to fetch books',
            }));
            throw error;
        }
    },

    getNewRelease: async (params = {}) => {
        try {
            set((state) => ({
                loading: true,
                error: null
            }));
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await bookService.getNewRelease(params);
            set((state) => ({
                newRelease: data,
                loading: false,
            }));
        } catch (error) {
            set((state) => ({
                loading: true,
                error: error.message || 'Failed to fetch books',
            }));
            throw error;
        }
    },

    // Get book by ID
    getBookById: async (id) => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.getBookById(id);
            set({ currentBook: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch book',
                loading: false
            });
            throw error;
        }
    },

    // Get featured books
    getFeaturedBooks: async () => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.getFeaturedBooks();
            set({ featuredBooks: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch featured books',
                loading: false
            });
            throw error;
        }
    },

    // Get books by category
    getBooksByCategory: async (categoryId, params = {}) => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.getBooksByCategory(categoryId, params);
            set({ books: data, loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch books by category',
                loading: false
            });
            throw error;
        }
    },

    // Get book reviews
    getBookReviews: async (bookId) => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.getBookReviews(bookId);
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch book reviews',
                loading: false
            });
            throw error;
        }
    },

    // Add book review
    addBookReview: async (bookId, reviewData) => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.addBookReview(bookId, reviewData);
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to add review',
                loading: false
            });
            throw error;
        }
    },

    // Get reading history
    getReadingHistory: async () => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.getReadingHistory();
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch reading history',
                loading: false
            });
            throw error;
        }
    },

    // Add to reading list
    addToReadingList: async (bookId) => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.addToReadingList(bookId);
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to add to reading list',
                loading: false
            });
            throw error;
        }
    },

    // Remove from reading list
    removeFromReadingList: async (bookId) => {
        try {
            set({ loading: true, error: null });
            const data = await bookService.removeFromReadingList(bookId);
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                error: error.message || 'Failed to remove from reading list',
                loading: false
            });
            throw error;
        }
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useBookStore; 