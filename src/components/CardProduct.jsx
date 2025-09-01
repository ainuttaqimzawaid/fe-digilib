import React from "react";
import { config } from '../config';
import { useNavigate } from "react-router-dom";
import useQueueStore from "../app/store/useQueueStore";
import useBorrowingStore from "../app/store/useBorrowingStore";
import { AiOutlineRollback } from "react-icons/ai";
import { GoShareAndroid } from "react-icons/go";

const CardBook = ({ Id, item, context }) => {
    const navigate = useNavigate();
    const { returnBorrowing } = useBorrowingStore();
    const { cancelQueue } = useQueueStore();

    const handleDetailBook = () => {
        console.log(`Navigating to book detail for ID: ${item.id}`);
        navigate(`/book/${item.id}`);
    };
    return (
        <div className="w-40 rounded">
            {console.log(item)}
            <button
                className="w-40 !p-0"
                onClick={handleDetailBook}>
                <img
                    src={`${config.api_host}/public/images/books/${item.image_url}`}
                    alt={item.image_url} className="w-full object-cover shadow-2xl h-56" />
                <div className="py-3">
                    <h2 className="text-lg text-gray-700 truncate">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.author}</p>
                </div>
            </button>
            {context === "borrowing" && (
                <div className="flex">
                    <div className="relative group">
                        <button
                            onClick={() => returnBorrowing(Id)}
                            className="text-gray-700 !ps-0 !pt-0 rounded hover:text-black"
                        >
                            <AiOutlineRollback />
                        </button>
                        <span
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/3 hidden group-hover:flex 
                                       bg-gray-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap
                                        after:content-[''] after:absolute after:top-full after:left-1/4 after:-translate-x-1/2
                                        after:border-4 after:border-transparent after:border-t-gray-600"
                        >
                            Return Book
                        </span>
                    </div>
                    <div className="relative group">
                        <button
                            onClick={() => cancelQueue(book.id)}
                            className="text-gray-700 px-4 !pt-0 rounded hover:text-black"
                        >
                            <GoShareAndroid />
                        </button>
                        <span
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/3 hidden group-hover:flex 
                                       bg-gray-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap
                                        after:content-[''] after:absolute after:top-full after:left-1/3 after:-translate-x-1/2
                                        after:border-4 after:border-transparent after:border-t-gray-600"
                        >
                            Share
                        </span>
                    </div>
                </div>
            )}

            {context === "queue" && (
                <div className="flex">
                    <div className="relative group">
                        <button
                            onClick={() => cancelQueue(Id)}
                            className="text-gray-700 !ps-0 !pt-0 rounded hover:text-black"
                        >
                            <AiOutlineRollback />
                        </button>
                        <span
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/3 hidden group-hover:flex 
                                       bg-gray-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap
                                        after:content-[''] after:absolute after:top-full after:left-1/4 after:-translate-x-1/2
                                        after:border-4 after:border-transparent after:border-t-gray-600"
                        >
                            Cancel Queue
                        </span>
                    </div>
                    <div className="relative group">
                        <button
                            onClick={() => cancelQueue(book.id)}
                            className="text-gray-700 px-4 !pt-0 rounded hover:text-black"
                        >
                            <GoShareAndroid />
                        </button>
                        <span
                            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/3 hidden group-hover:flex 
                                       bg-gray-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap
                                        after:content-[''] after:absolute after:top-full after:left-1/3 after:-translate-x-1/2
                                        after:border-4 after:border-transparent after:border-t-gray-600"
                        >
                            Share
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardBook;