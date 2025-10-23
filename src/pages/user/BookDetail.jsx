// pages/BookDetail.jsx
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBookStore from '../../app/store/useBookStore';
import useReviewStore from '../../app/store/useReviewStore';
import StarRating from '../../components/RatingBook';
import BookInfo from '../../components/BookInfo';
import Loading from '../../components/Loading';
import BookInfoPlaceholder from '../../components/BookInfoPlaceholder';


const BookDetail = () => {
    const detailBook = ['deskripsi', 'detail', 'ulasan'];
    const { id } = useParams();
    const { getBookById, currentBook, loading, error } = useBookStore();
    const { getReviewsByBook, bookReviews, loading: reviewLoading } = useReviewStore();
    const [activeTab, setActiveTab] = useState(detailBook[0]);
    const [underlineStyle, setUnderlineStyle] = useState({});

    useEffect(() => {
        if (id) {
            getBookById(id);
            getReviewsByBook(id);
        }
    }, [id]);

    const btn = document.querySelector(`[data-tab='${activeTab}']`);
    useEffect(() => {
        if (btn) {
            setUnderlineStyle({
                width: btn.offsetWidth,
                left: btn.offsetLeft,
            });
        }
    }, [activeTab, btn]);

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto py-32 px-6 min-h-screen">
            {/* {console.log(loading.currentBook)} */}
            <div className='bg-white rounded-xl shadow-md p-6'>
                <h2 className='text-3xl mb-4'>Detail Buku</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        {
                            loading.currentBook === 'process' ? (
                                <BookInfoPlaceholder />
                            ) : currentBook ? (
                                <BookInfo book={currentBook} />
                            ) : (
                                <p>Buku tidak ditemukan.</p>
                            )
                        }
                    </div>
                    <div>
                        <div className="relative flex gap-2 mb-4 space-x-4 border-b border-gray-200">
                            {detailBook.map((tab) => (
                                <button
                                    key={tab}
                                    data-tab={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm transition-colors duration-200 ${activeTab === tab
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}

                            {/* underline animasi */}
                            <span
                                className="absolute bottom-0 h-[3px] bg-blue-600 transition-all duration-300 rounded-full"
                                style={underlineStyle}
                            />
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
                        {console.log(bookReviews)}
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
                                            {console.log(review)}
                                            <div>
                                                <p className="font-semibold">{review.user?.userName}</p>
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
