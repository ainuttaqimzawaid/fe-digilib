const BookReviewList = ({ reviews }) => {
    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Reviews</h3>
            {reviews?.length > 0 ? (
                reviews.map((review) => (
                    <div
                        key={review.id}
                        className="flex gap-4 items-start border-b pb-3 mb-3"
                    >
                        <div className="w-14 h-14 text-3xl bg-gray-500 text-white flex items-center justify-center rounded-full">
                            {review.User?.userName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-semibold">{review.User?.userName}</p>
                            <p className="text-yellow-500">
                                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                            </p>
                            <p>{review.comment}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 italic">Belum ada ulasan untuk buku ini.</p>
            )}
        </div>
    );
};

export default BookReviewList;
