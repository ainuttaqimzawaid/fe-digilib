import StarRating from "./RatingBook";

const BookInfoPlaceholder = ({ book }) => {

    return (
        <div className="flex gap-6">
            <div
                className="min-w-40 h-60 object-cover rounded bg-gray-300 animate-pulse"
            ></div>
            <div>
                <div className="bg-gray-300 font-bold w-60 h-8 animate-pulse mb-2"></div>
                <div className="bg-gray-300 w-40 h-8 animate-pulse"></div>
                <StarRating
                    readOnly={true}
                />

                <div className="mt-2 sm:mt-6 flex flex-col sm:flex-row sm:gap-4">
                    <div
                        className="bg-gray-300 text-white w-24 h-8 !rounded-full mb-2"
                    >
                    </div>
                    <div
                        className="bg-gray-300 text-white w-24 h-8 !rounded-full"
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookInfoPlaceholder;
