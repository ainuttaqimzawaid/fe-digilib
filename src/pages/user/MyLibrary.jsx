import { useEffect, useState } from "react";
import useBorrowingStore from "../../app/store/useBorrowingStore";
import CardBook from "../../components/CardProduct";
import useQueueStore from "../../app/store/useQueueStore";
import useReviewStore from "../../app/store/useReviewStore";
import Loading from "../../components/Loading";
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

    // fetch default saat mount → "Borrowed"
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


    // if (error) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <div className="text-red-500 text-center">
    //                 <h2 className="text-2xl font-bold mb-2">Error</h2>
    //                 <p>{error}</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">My Library</h1>

            {/* Tab Menu */}
            <div className="flex gap-2 overflow-x-auto border-b pb-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleFetch(tab)}
                        className={`px-4 py-2 whitespace-nowrap rounded-full transition text-sm ${activeTab === tab
                            ? "bg-blue-600 text-white font-semibold"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-md p-4 min-h-[200px]">
                {activeTab === 'Borrowed' && (
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4">Borrowed Books</h2>
                        <div className="w-full flex flex-wrap gap-6">
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
                        <div className="w-full flex flex-wrap gap-6">
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
                        <div className="w-full flex flex-wrap gap-6">
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
                        <div className="w-full flex flex-wrap gap-6">
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
