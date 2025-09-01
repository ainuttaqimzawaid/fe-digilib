import { useEffect } from "react";
import { useQueueStore } from "../store/useQueueStore";

const QueueList = ({ token }) => {
    const { myQueue, loading, fetchMyQueue, cancelQueue } = useQueueStore();

    useEffect(() => {
        if (token) fetchMyQueue(token);
    }, [token]);

    if (loading) return <p>Loading queue...</p>;

    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Antrian Buku Saya</h2>
            {myQueue.length === 0 ? (
                <p>Tidak ada dalam antrian</p>
            ) : (
                <ul className="space-y-2">
                    {myQueue.map((q) => (
                        <li
                            key={q.id}
                            className="p-3 border rounded flex justify-between items-center"
                        >
                            <span>{q.book.title}</span>
                            <button
                                onClick={() => cancelQueue(q.id, token)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Batal
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QueueList;
