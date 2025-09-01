// pages/BookDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBookStore from '../../app/store/useBookStore';
import useReviewStore from '../../app/store/useReviewStore';
import StarRating from '../../components/RatingBook';
import BookInfo from '../../components/BookInfo';
import Loading from '../../components/Loading';


const BookDetail = () => {
    const { id } = useParams();
    const { getBookById, currentBook, error } = useBookStore();
    const { getReviewsByBook, bookReviews, loading: reviewLoading } = useReviewStore();
    const [activeTab, setActiveTab] = useState("deskripsi");

    useEffect(() => {
        if (id) {
            getBookById(id);
            getReviewsByBook(id);
        }
    }, [id]);

    // if (loading) return <p>Loading book...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!currentBook) return <p>Book not found.</p>;

    return (
        <div className="container mx-auto py-32 px-6 min-h-screen">
            {console.log(bookReviews)}
            <div className='bg-white rounded-xl shadow-md p-6'>
                <h2 className='text-3xl mb-4'>Detail Buku</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <BookInfo book={currentBook} />
                    </div>
                    <div>
                        <div className="flex gap-2 mb-4">
                            <button onClick={() => setActiveTab("deskripsi")}>Deskripsi</button>
                            <button onClick={() => setActiveTab("detail")}>Detail</button>
                            <button onClick={() => setActiveTab("ulasan")}>Ulasan</button>
                        </div>

                        {activeTab === "deskripsi" && (
                            <div>
                                <p>Ini adalah deskripsi buku. Buku ini membahas tentang...</p>
                            </div>
                        )}
                        {activeTab === "detail" && (
                            <div>
                                <table className="mt-2 w-full text-left">
                                    <tbody>
                                        <tr><td className="font-semibold w-1/3">Pengarang</td><td>{currentBook.author}</td></tr>
                                        <tr><td className="font-semibold">Penerbit</td><td>Belum Dibuat</td></tr>
                                        <tr><td className="font-semibold">Tahun Terbit</td><td>{currentBook.year}</td></tr>
                                        <tr><td className="font-semibold">EISBN</td><td>{currentBook.isbn}</td></tr>
                                        <tr><td className="font-semibold">Kategori</td><td>{currentBook.Category.name}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {console.log(bookReviews.length)}
                        {activeTab === "ulasan" && (
                            <div className="flex flex-col gap-4">
                                {reviewLoading ? (
                                    <Loading />
                                ) : bookReviews.length > 0 ? (
                                    bookReviews.map((review) => (
                                        <div key={review.id} className="flex gap-4 items-start border-b pb-3">
                                            <div className="w-14 h-14 text-3xl bg-gray-500 text-white flex items-center justify-center rounded-full">
                                                {review.User?.userName?.charAt(0).toUpperCase()}
                                            </div>
                                            {console.log(review.id)}
                                            <div>
                                                <p className="font-semibold">{review.User?.userName}</p>
                                                <div className="text-yellow-500">
                                                    <StarRating value={review.rating} readOnly={true} />
                                                </div>
                                                <p>{review.comment}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Belum ada ulasan untuk buku ini.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookDetail;
