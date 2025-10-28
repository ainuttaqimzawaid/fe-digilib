import { useEffect, useState } from "react";
import useBorrowingStore from "../../app/store/useBorrowingStore";
import CardBook from "../../components/CardProduct";
import useQueueStore from "../../app/store/useQueueStore";
import useReviewStore from "../../app/store/useReviewStore";
import CardProductPlaceholder from "../../components/CardProductPlaceholder";


const MyLibrary = () => {
    const tabs = ["Borrowed", "Queue", "History", "Reviews"];
    const [activeTab, setActiveTab] = useState("Borrowed");

    const {
        borrowedBooks,
        returnBorrowing,
        returnedBooks,
        loading: borrowingLoading,
        error: borrowingError,
        getBorrowings,
        getHistoryBorrowings,
    } = useBorrowingStore();

    const {
        userReviews,
        getReviewsByUser,
        loading: reviewLoading,
    } = useReviewStore();

    const {
        fetchMyQueue,
        cancelQueue,
        myQueue,
        loading: queueLoading,
        error: queueError,
    } = useQueueStore();

    useEffect(() => {
        handleFetch("Borrowed");
    }, [returnBorrowing]);

    const handleFetch = async (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case "Borrowed":
                await getBorrowings();
                break;
            case "Queue":
                await fetchMyQueue();
                break;
            case "History":
                await getHistoryBorrowings();
                break;
            case "Reviews":
                await getReviewsByUser();
                break;
            default:
                break;
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-20 md:py-32 px-6">
            {/* {console.log(borrowingLoading)} */}
            <h3 className="md:hidden text-xl font-bold text-gray-800 mb-4">My Library</h3>

            {/* Tab Menu */}
            <div className="flex md:gap-2 overflow-x-auto border-b pb-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleFetch(tab)}
                        className={`sm:!px-1 md:!px-4 !py-2 whitespace-nowrap rounded-full transition !text-sm md:!text-base ${activeTab === tab
                            ? "bg-blue-600 text-white font-semibold"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 min-h-[200px]">
                {activeTab === 'Borrowed' && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">Borrowed Books</h2>
                        <div className="w-full flex flex-wrap gap-3 md:gap-4">
                            {borrowingLoading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} md={3}>
                                        <CardProductPlaceholder />
                                    </div>
                                ))
                            ) : borrowedBooks.length === 0 ? (
                                <div>No borrowed books found</div>
                            ) : (
                                borrowedBooks.map(item => <CardBook key={item.id} Id={item.id} item={item.Book} context="borrowing" />)
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "Queue" && (
                    <div className="w-full">
                        {/* {console.log(myQueue)} */}
                        <h2 className="text-xl font-semibold mb-2">Queue List</h2>
                        <div className="w-full flex flex-wrap gap-3 md:gap-4">
                            {queueLoading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} md={3}>
                                        <CardProductPlaceholder />
                                    </div>
                                ))
                            ) : myQueue.length === 0 ? (
                                <div>No borrowed books found</div>
                            ) : (
                                myQueue.map(item => <CardBook key={item.id} Id={item.id} item={item.Book} context="queue" />)
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "History" && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-2">Borrowing History</h2>
                        <div className="w-full flex flex-wrap gap-3 md:gap-4">
                            {borrowingLoading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} md={3}>
                                        <CardProductPlaceholder />
                                    </div>
                                ))
                            ) : returnedBooks.length === 0 ? (
                                <div>No borrowed books found</div>
                            ) : (
                                returnedBooks.map(item => <CardBook key={item.id} item={item.Book} />)
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "Reviews" && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-2">Your Reviews</h2>
                        {console.log(userReviews)}
                        <div className="w-full flex flex-wrap gap-3 md:gap-4">
                            {reviewLoading ? (
                                Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} md={3}>
                                        <CardProductPlaceholder />
                                    </div>
                                ))
                            ) : userReviews.length === 0 ? (
                                <div>No reviews found</div>
                            ) : (
                                userReviews.map((item) => (
                                    <CardBook key={item.id} item={item.Book} />
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLibrary;
