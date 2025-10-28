import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import StarRating from "./RatingBook";
import { config } from "../config";

const ReviewModal = ({ book, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ bookId: book.id, rating, comment });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-saturate-50 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-2xl w-96 md:w-5/12 relative">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-2 right-2 px-2 py-1 border rounded text-gray-400 hover:text-black"
                >
                    <IoIosClose className="text-3xl" />
                </button>

                <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">
                    Beri Ulasan
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4 border border-gray-200 p-4 rounded">
                        <img
                            // src={`${config.api_host}/public/images/books/${book.image_url}`}
                            src={book.image_url}
                            alt={book.title}
                            className="w-32 object-cover rounded"
                        />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold">{book.title}</h2>
                            <p className="text-gray-600">{book.author}</p>
                            <StarRating value={rating} onChange={setRating} />
                            <p className="text-blue-800">Berikan rating buku ini</p>
                        </div>
                    </div>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tulis ulasan..."
                        className="w-full border p-2 rounded text-sm"
                        rows={2}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-800 text-white rounded hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
