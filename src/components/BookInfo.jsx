import { useState, useEffect } from "react";
// import { config } from "../config";
import useBorrowingStore from "../app/store/useBorrowingStore";
import useQueueStore from "../app/store/useQueueStore";
import useReviewStore from "../app/store/useReviewStore";
import ReviewModal from "./ReviewModal";
import StarRating from "./RatingBook";
import { toast } from "react-toastify";

const BookInfo = ({ book }) => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [editingReview, setEditingReview] = useState(null);

    const {
        createBorrowing,
        getBorrowings,
        borrowedBooks,
        error: borrowingError,
    } = useBorrowingStore();
    const { fetchMyQueue, addQueue, myQueue, error: queueError } = useQueueStore();
    const { createReview, updateReview, bookReviews, userReviews } = useReviewStore();

    useEffect(() => {
        getBorrowings();
        fetchMyQueue();
    }, [getBorrowings, fetchMyQueue]);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const requireLogin = () => {
        if (!userId) {
            toast.warn("Silakan login dulu untuk melanjutkan.");
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
        if (editingReview) {
            updateReview(bookId, { rating, comment });
        } else {
            createReview({ bookId, rating, comment });
        }
        setEditingReview(null);
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

    const existingReview = userReviews?.find(
        (r) => r.bookId === book.id && r.userId === userId
    );

    const averageRating = bookReviews.length
        ? bookReviews.reduce((acc, r) => acc + r.rating, 0) / bookReviews.length
        : 0;

    return (
        <div className="flex gap-6">
            {console.log(book)}
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
                {/* <StarRating
                    value={bookReviews[0] ? bookReviews[0].rating : 0}
                    readOnly={true}
                /> */}
                <StarRating value={averageRating} readOnly />

                <div className="mt-2 sm:mt-6 flex gap-4">
                    {isBorrowed ? (
                        <div className="sm:flex flex-col sm:flex-row md:gap-4">
                            <button onClick={() => handleOpenBook(book)} className="btn-primary bg-green-600 hover:bg-green-700 mb-1 sm:mb-0">
                                Baca
                            </button>
                            <button
                                onClick={() => {
                                    setEditingReview(existingReview || null);
                                    setShowReviewModal(true);
                                }}
                                className={`btn-primary ${existingReview
                                    ? "bg-yellow-600 hover:bg-yellow-700"
                                    : "bg-gray-500 hover:bg-gray-600"
                                    }`}
                            >
                                {existingReview ? "Ubah Ulasan" : "Ulasan"}
                            </button>
                        </div>
                    ) : book.availableCopies > 0 ? (
                        <button onClick={handleBorrowBook} className="btn-primary bg-blue-600 hover:bg-blue-700">
                            Pinjam
                        </button>
                    ) : isQueued ? (
                        <button disabled className="btn-primary bg-gray-400">
                            Sudah Antri
                        </button>
                    ) : (
                        <button onClick={handleQueueBook} className="btn-primary bg-yellow-500 hover:bg-yellow-600">
                            Antri
                        </button>
                    )}
                </div>

                {/* <div className="mt-2 sm:mt-6 flex gap-4">
                    {isBorrowed ? (
                        <div className="sm:flex flex-col sm:flex-row md:gap-4">
                            <button
                                className="bg-green-600 text-white !px-6 !py-2 !rounded-full hover:bg-green-700 w-[90px] mb-1 sm:mb-0"
                                onClick={() => handleOpenBook(book)}
                            >
                                Baca
                            </button>
                            <button
                                onClick={() => {
                                    setEditingReview(existingReview || null);
                                    setShowReviewModal(true);
                                }}
                                className={`text-white !px-6 !py-2 !rounded-full ${existingReview
                                    ? "bg-yellow-600 hover:bg-yellow-700"
                                    : "bg-gray-500 hover:bg-gray-600"
                                    }`}
                            >
                                {existingReview ? "Ubah Ulasan" : "Ulasan"}
                            </button>
                        </div>
                    ) : book.availableCopies > 0 ? (
                        <button
                            onClick={handleBorrowBook}
                            className="bg-blue-600 text-white !px-6 !py-2 !rounded-full hover:bg-blue-700"
                        >
                            Pinjam
                        </button>
                    ) : isQueued ? (
                        <button
                            disabled
                            className="bg-gray-400 text-white !px-6 !py-2 !rounded-full">
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
                </div> */}

                {showReviewModal && (
                    <ReviewModal
                        book={book}
                        onClose={() => {
                            setShowReviewModal(false);
                            setEditingReview(null);
                        }}
                        onSubmit={handleSubmitReview}
                        existingReview={editingReview}
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
