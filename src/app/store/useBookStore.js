import { create } from 'zustand';
import { bookService } from '../api/services/book';

// Status constants
const STATUS = {
    IDLE: 'idle',
    PROCESS: 'process',
    SUCCESS: 'success',
    ERROR: 'error'
};

const useBookStore = create((set) => ({
    // States
    allBooks: { count: 0, data: [] },
    favoriteBooks: { count: 0, data: [], nextCursor: null },
    newArrival: { count: 0, data: [], nextCursor: null },
    newRelease: { count: 0, data: [], nextCursor: null },
    categoryBooks: [],
    featuredBooks: [],
    currentBook: null,
    error: null,
    isFetched: false,
    loading: {
        allBooks: STATUS.IDLE,
        favoriteBooks: STATUS.IDLE,
        newArrival: STATUS.IDLE,
        newRelease: STATUS.IDLE,
        categoryBooks: STATUS.IDLE,
        featuredBooks: STATUS.IDLE,
        currentBook: STATUS.IDLE
    },

    // Helpers
    setLoading: (key, status) =>
        set((state) => ({
            loading: { ...state.loading, [key]: status }
        })),

    setError: (message) =>
        set({
            error: message || 'An unexpected error occurred'
        }),

    clearError: () => set({ error: null }),

    // Fetch All Books
    getAllBooks: async (params = {}) => {
        const { setLoading, setError } = useBookStore.getState();
        // const limit = parseInt(params.limit, 10) || 10;
        // const lastId = params.lastId ? parseInt(params.lastId, 10) : null;

        // console.log('📚 Fetching all books → limit:', limit, 'lastId:', lastId);

        try {
            setLoading('allBooks', STATUS.PROCESS);

            const data = await bookService.getAllBooks(params);

            set((state) => {
                // Kalau tidak ada cursor (berarti request pertama), replace data
                if (!params.lastId && !params.lastCreatedAt) {
                    return {
                        allBooks: { count: data.count, data: data.rows },
                        error: null,
                    };
                }

                // Kalau ada cursor, append data baru ke list lama
                return {
                    allBooks: {
                        count: data.count,
                        data: [
                            ...state.allBooks.data,
                            ...data.rows.filter(
                                (b) => !state.allBooks.data.some((x) => x.id === b.id)
                            ), // Hindari duplikat
                        ],
                    },
                    error: null,
                };
            });

            setLoading('allBooks', STATUS.SUCCESS);
            return data; // penting agar frontend bisa ambil nextCursor
        } catch (error) {
            setError(error.message);
            setLoading('allBooks', STATUS.ERROR);
            throw error;
        }
    },

    getFavoriteBooks: async (params = {}) => {
        const { setLoading, setError } = useBookStore.getState();

        // const limit = parseInt(params.limit, 10) || 5;
        // const lastId = parseInt(params.lastId, 10) || null;
        // const lastReadCount = parseInt(params.lastReadCount, 10) || null;
        // console.log('Fetching favorite books with limit:', limit, 'and lastId:', lastId, 'and lastReadCount:', lastReadCount);
        try {
            setLoading('favoriteBooks', STATUS.PROCESS);
            const data = await bookService.getFavoriteBooks(params);

            // console.log('Fetched favorite books data:', data);

            set((state) => {
                if (!params.lastId) {
                    // Fetch pertama → ganti data lama
                    return {
                        favoriteBooks: { count: data.count, data: data.rows, nextCursor: data.nextCursor },
                        error: null,
                    };
                }
                // Fetch berikutnya → gabung data baru tanpa duplikat
                return {
                    favoriteBooks: {
                        count: data.count,
                        data: [
                            ...state.favoriteBooks.data,
                            ...data.rows.filter((b) => !state.favoriteBooks.data.some((x) => x.id === b.id)),
                        ],
                        nextCursor: data.nextCursor,
                    },
                    error: null,
                };
            });

            setLoading('favoriteBooks', STATUS.SUCCESS);
        } catch (error) {
            setError(error.message);
            setLoading('favoriteBooks', STATUS.ERROR);
            throw error;
        }
    },

    getNewArrival: async (params = {}) => {
        const { setLoading, setError } = useBookStore.getState();
        // const limit = parseInt(params.limit, 10) || 10;
        // const lastId = params.lastId ? parseInt(params.lastId, 10) : null;
        // const lastCreatedAt = params.lastCreatedAt ? parseInt(params.lastCreatedAt, 10) : null;
        // console.log('Fetching favorite books with limit:', limit, 'and lastId:', lastId, 'and lastCreatedAt:', lastCreatedAt);

        try {
            setLoading('newArrival', STATUS.PROCESS);
            const data = await bookService.getNewArrival(params);
            // console.log('Fetched new arrival books data:', data);

            set((state) => {
                if (!params.lastId) {
                    // Fetch pertama → ganti data lama
                    return {
                        newArrival: { count: data.count, data: data.rows, nextCursor: data.nextCursor },
                        error: null,
                    };
                }
                // Fetch berikutnya → gabung data baru tanpa duplikat
                return {
                    newArrival: {
                        count: data.count,
                        data: [
                            ...state.newArrival.data,
                            ...data.rows.filter((b) => !state.newArrival.data.some((x) => x.id === b.id)),
                        ],
                        nextCursor: data.nextCursor,
                    },
                    error: null,
                };
            });

            setLoading('newArrival', STATUS.SUCCESS);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading('newArrival', STATUS.ERROR);
            throw error;
        }
    },

    getNewRelease: async (params = {}) => {
        const { setLoading, setError } = useBookStore.getState();
        // const limit = parseInt(params.limit, 10) || 10;
        // const lastId = params.lastId ? parseInt(params.lastId, 10) : null;
        // const lastYear = params.lastYear ? parseInt(params.lastYear, 10) : null;
        // console.log('Fetching favorite books with limit:', limit, 'and lastId:', lastId, 'and lastYear:', lastYear);

        try {
            setLoading('newRelease', STATUS.PROCESS);
            const data = await bookService.getNewRelease(params);

            set((state) => {
                if (!params.lastId) {
                    // Fetch pertama (replace)
                    return {
                        newRelease: { count: data.count, data: data.rows, nextCursor: data.nextCursor },
                        error: null,
                    };
                }
                // Fetch berikutnya (append)
                return {
                    newRelease: {
                        count: data.count,
                        data: [
                            ...state.newRelease.data,
                            ...data.rows.filter(
                                (book) => !state.newRelease.data.some((b) => b.id === book.id)
                            ),
                        ],
                        nextCursor: data.nextCursor,
                    },
                    error: null,
                };
            });

            setLoading('newRelease', STATUS.SUCCESS);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading('newRelease', STATUS.ERROR);
            throw error;
        }
    },

    getBookById: async (id) => {
        const { setLoading, setError } = useBookStore.getState();
        try {
            setLoading('currentBook', STATUS.PROCESS);
            const data = await bookService.getBookById(id);
            set({ currentBook: data, error: null });
            setLoading('currentBook', STATUS.SUCCESS);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading('currentBook', STATUS.ERROR);
            throw error;
        }
    },

    getFeaturedBooks: async () => {
        const { setLoading, setError } = useBookStore.getState();
        try {
            setLoading('featuredBooks', STATUS.PROCESS);
            const data = await bookService.getFeaturedBooks();
            set({ featuredBooks: data, error: null });
            setLoading('featuredBooks', STATUS.SUCCESS);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading('featuredBooks', STATUS.ERROR);
            throw error;
        }
    },

    getBooksByCategory: async (categoryId, params = {}) => {
        const { setLoading, setError } = useBookStore.getState();
        try {
            setLoading('categoryBooks', STATUS.PROCESS);
            const data = await bookService.getBooksByCategory(categoryId, params);
            set({ categoryBooks: data, error: null });
            setLoading('categoryBooks', STATUS.SUCCESS);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading('categoryBooks', STATUS.ERROR);
            throw error;
        }
    },

    getBookReviews: async (bookId) => {
        const { setError } = useBookStore.getState();
        try {
            const data = await bookService.getBookReviews(bookId);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    },

    addBookReview: async (bookId, reviewData) => {
        const { setError } = useBookStore.getState();
        try {
            const data = await bookService.addBookReview(bookId, reviewData);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    },

    // Reading History
    getReadingHistory: async () => {
        const { setError } = useBookStore.getState();
        try {
            const data = await bookService.getReadingHistory();
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    },

    // Reading List
    addToReadingList: async (bookId) => {
        const { setError } = useBookStore.getState();
        try {
            const data = await bookService.addToReadingList(bookId);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    },

    removeFromReadingList: async (bookId) => {
        const { setError } = useBookStore.getState();
        try {
            const data = await bookService.removeFromReadingList(bookId);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }
}));

export default useBookStore;
