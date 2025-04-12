import { useState, useEffect } from 'react';
import { bookService } from '../services/books/bookService';

export const useBooks = (params = {}) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const data = await bookService.getAllBooks(params);
                setBooks(data);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [JSON.stringify(params)]);

    return { books, loading, error };
};

export const useBookById = (id) => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const data = await bookService.getBookById(id);
                setBook(data);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch book');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id]);

    return { book, loading, error };
};

export const useFeaturedBooks = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            try {
                setLoading(true);
                const data = await bookService.getFeaturedBooks();
                setFeaturedBooks(data);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch featured books');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedBooks();
    }, []);

    return { featuredBooks, loading, error };
}; 