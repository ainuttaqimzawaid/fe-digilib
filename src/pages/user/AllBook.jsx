import { useEffect, useState } from 'react';
import useBookStore from '../../app/store/useBookStore';
import CardBook from '../../components/CardProduct';
import CardProductPlaceholder from '../../components/CardProductPlaceholder';
import { FaArrowDown } from "react-icons/fa";

const AllBooks = () => {
    const {
        allBooks,
        loading,
        error,
        getAllBooks,
        clearError
    } = useBookStore();

    const limit = 20;

    // Simpan cursor
    const [cursor, setCursor] = useState(null);

    useEffect(() => {
        // Pertama kali load (cursor = null)
        getAllBooks({ limit }).then((res) => {
            if (res.nextCursor) setCursor(res.nextCursor);
        }).catch((err) => console.error(err));
    }, [getAllBooks]);

    const getNextAllBooks = async () => {
        if (!cursor) return;

        try {
            const res = await getAllBooks({
                limit,
                lastId: cursor.lastId,
            });

            if (res.nextCursor) setCursor(res.nextCursor);
            else setCursor(null); // jika sudah habis
        } catch (err) {
            console.error(err);
        }
    };

    if (error) {
        return (
            <div className="text-red-500">
                <p>Error: {error}</p>
                <button
                    onClick={clearError}
                    className="mt-2 px-4 py-1 bg-red-600 text-white rounded"
                >
                    Clear Error
                </button>
            </div>
        );
    }

    return (
        <section className="container mx-auto py-20 md:py-32 px-6 min-h-screen">
            <h3 className="text-xl font-bold text-gray-800 mb-4">All Books</h3>

            <div className="flex flex-wrap gap-4 bg-white rounded-2xl pt-6 justify-center">
                {loading.allBooks === 'success' && allBooks.data.length === 0 ? (
                    <div className="text-center w-full py-24 text-gray-500">
                        <h1>Produk tidak ditemukan</h1>
                    </div>
                ) : (
                    allBooks.data.map((book, i) => (
                        <CardBook key={book.id || i} item={book} />
                    ))
                )}

                {loading.allBooks === 'process' && (
                    Array.from({ length: 12 }).map((_, idx) => (
                        <div key={idx}>
                            <CardProductPlaceholder />
                        </div>
                    ))
                )}

                {/* Tombol "Selengkapnya" */}
                {cursor && (
                    <button
                        className="h-auto flex items-center gap-2 text-amber-500 mt-4"
                        onClick={getNextAllBooks}
                    >
                        <p>Selengkapnya</p>
                        <FaArrowDown />
                    </button>
                )}
            </div>
        </section>
    );
};

export default AllBooks;
