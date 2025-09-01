import { useEffect, useState } from 'react';
import useBookStore from '../../app/store/useBookStore';
import CardBook from '../../components/CardProduct';
import CardProductPlaceholder from '../../components/CardProductPlaceholder';


const AllBooks = () => {
    const { allBooks, loading: bookLoading, error, getAllBooks } = useBookStore();

    useEffect(() => {
        getAllBooks();
    }, []);

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-center">
                    <h2 className="text-2xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto py-32 px-6 min-h-screen">
            <h3 className="text-xl font-bold text-gray-800 mb-4">All Books</h3>
            {console.log(allBooks)}
            <div className='flex flex-wrap gap-6 bg-white rounded-2xl pt-6 justify-center'>
                {
                    bookLoading === true ? (
                        Array.from({ length: 16 }).map((_, idx) => (
                            <div key={idx} md={3}>
                                <CardProductPlaceholder />
                            </div>
                        ))
                    ) : allBooks.length === 0 ? (
                        <div style={{ textAlign: 'center', width: '100%', padding: '100px 0', color: '#6e736f' }}>
                            <h1>Produk tidak ditemukan</h1>
                        </div>
                    ) : (
                        allBooks.rows.map((book, i) => (
                            <CardBook key={i} item={book} />
                        ))
                    )
                }
            </div>
        </section>
    );
};

export default AllBooks;
