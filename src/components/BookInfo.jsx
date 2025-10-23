import { useState, useEffect } from "react";
import { config } from "../config";
import useBorrowingStore from "../app/store/useBorrowingStore";
import useQueueStore from "../app/store/useQueueStore";
import useReviewStore from "../app/store/useReviewStore";
import ReviewModal from "./ReviewModal";
import StarRating from "./RatingBook";
import { toast } from "react-toastify";

const BookInfo = ({ book }) => {
    const [showReviewModal, setShowReviewModal] = useState(false);

    const {
        createBorrowing,
        getBorrowings,
        borrowedBooks,
        error: borrowingError,
    } = useBorrowingStore();

    const { fetchMyQueue, addQueue, myQueue, error: queueError } = useQueueStore();
    const { createReview, bookReviews } = useReviewStore();

    useEffect(() => {
        getBorrowings();
        fetchMyQueue();
    }, [getBorrowings, fetchMyQueue]);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const requireLogin = () => {
        if (!userId) {
            alert("Silakan login dulu");
            return false;
        }
        return true;
    };

    const handleBorrowBook = () => {
        if (!requireLogin()) return;
        createBorrowing({ userId, bookId: book.id });
    };

    const handleQueueBook = () => {
        if (!requireLogin()) return;
        addQueue({ bookId: book.id });
    };

    const handleSubmitReview = ({ bookId, rating, comment }) => {
        createReview({ bookId, rating, comment });
    };

    const handleOpenBook = (book) => {
        // 1. Validasi: file_url tidak boleh kosong
        if (!book.file_url || book.file_url.trim() === '') {
            toast.info('😱😱😱 Oh tidaak!! hak akses anda dibatasi!!!');
            return;
        }

        // 2. Validasi: harus URL yang valid
        try {
            new URL(book.file_url); // ini akan throw error jika bukan URL
        } catch (error) {
            alert('URL file tidak valid.');
            return;
        }

        // 3. Logging: tampilkan di console (bisa juga dikirim ke backend)
        console.log(`Membuka file: "${book.title}" (id: ${book.id})`);

        // 4. Tracking (opsional): kirim ke server (misalnya untuk analytics)
        fetch('/api/logs/open-book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookId: book.id,
                title: book.title,
                openedAt: new Date().toISOString(),
            })
        }).catch(err => {
            console.warn('Gagal mengirim log:', err);
        });

        // 5. Buka file di tab baru dengan aman
        window.open(book.file_url, '_blank', 'noopener,noreferrer');
    };


    const isBorrowed = borrowedBooks?.some(
        (b) => b.bookId === book.id && b.status === "borrowed"
    );
    const isQueued = myQueue?.some((q) => q.bookId === book.id);

    return (
        <div className="flex gap-6">
            <img
                // image from assets folder
                // src={`${config.api_host}/public/images/books/${book.image_url}`}

                // image from cloudinary
                src={book.image_url}
                alt={book.title}
                className="w-40 h-60 object-cover rounded"
            />

            <div>
                <h2 className="text-2xl font-bold">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <StarRating
                    value={bookReviews[0] ? bookReviews[0].rating : 0}
                    readOnly={true}
                />

                <div className="mt-6 flex gap-4">
                    {isBorrowed ? (
                        <>
                            <button
                                className="bg-green-600 text-white !px-6 !py-2 !rounded-full hover:bg-green-700"
                                onClick={() => handleOpenBook(book)}
                            >
                                Baca
                            </button>
                            <button
                                onClick={() => setShowReviewModal(true)}
                                className="bg-gray-500 text-white !px-6 !py-2 !rounded-full hover:bg-gray-600"
                            >
                                Ulasan
                            </button>
                        </>
                    ) : book.availableCopies > 0 ? (
                        <button
                            onClick={handleBorrowBook}
                            className="bg-blue-600 text-white !px-6 !py-2 !rounded-full hover:bg-blue-700"
                        >
                            Pinjam
                        </button>
                    ) : isQueued ? (
                        <button className="bg-gray-400 text-white !px-6 !py-2 !rounded-full cursor-not-allowed">
                            Sudah Antri
                        </button>
                    ) : (
                        <button
                            onClick={handleQueueBook}
                            className="bg-yellow-500 text-white !px-6 !py-2 !rounded-full hover:bg-yellow-600"
                        >
                            Antri
                        </button>
                    )}
                </div>

                {showReviewModal && (
                    <ReviewModal
                        book={book}
                        onClose={() => setShowReviewModal(false)}
                        onSubmit={handleSubmitReview}
                    />
                )}

                {(borrowingError || queueError) && (
                    <p className="text-red-500 mt-2">{borrowingError || queueError}</p>
                )}
            </div>
        </div>
    );
};

export default BookInfo;
