import { useEffect, useRef, useState } from "react";
import CardBook from "./CardProduct";
import { FaArrowRight } from "react-icons/fa";
import CardProductPlaceholder from "./CardProductPlaceholder";

const BookSection = ({
    title,
    dataKey,       // contoh: 'newArrival' / 'newRelease' / 'favorite'
    data,
    loading,
    error,
    getData
}) => {
    // const [cursor, setCursor] = useState(null);
    const limit = 5;
    const scrollRef = useRef(null);

    // 🔹 Fetch pertama kali
    useEffect(() => {
        getData({ limit });
    }, [getData]);

    // 🔹 Load more (cursor-based)
    const loadMore = async () => {
        console.log(data);
        if (!data.nextCursor) return;

        let cursorParams = {};

        // Tentukan cursor field berdasarkan dataKey
        switch (dataKey) {
            case 'newArrival':
                cursorParams = { lastCreatedAt: data.nextCursor.lastCreatedAt };
                break;
            case 'newRelease':
                cursorParams = { lastYear: data.nextCursor.lastYear };
                break;
            case 'favoriteBooks':
                cursorParams = { lastReadCount: data.nextCursor.lastReadCount };
                break;
            default:
                cursorParams = {};
                break;
        }

        // Lanjutkan fetch berikutnya pakai cursor
        const res = await getData({
            limit,
            lastId: data.nextCursor.lastId,
            ...cursorParams, // gabungkan cursor spesifik
        });
        console.log(cursorParams);

        // Simpan cursor baru (opsional, tergantung store kamu)
        // setCursor(res.nextCursor);
    };

    // 🔹 Drag-scroll (klik-tahan)
    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const startDragging = (e) => {
            isDown = true;
            slider.classList.add("cursor-grabbing");
            slider.classList.remove("cursor-grab");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };

        const stopDragging = () => {
            isDown = false;
            slider.classList.remove("cursor-grabbing");
            slider.classList.add("cursor-grab");
        };

        const move = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener("mousedown", startDragging);
        slider.addEventListener("mouseleave", stopDragging);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mousemove", move);

        return () => {
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mousemove", move);
        };
    }, []);

    // 🔹 Error Handling
    if (error) {
        return (
            <div className="text-red-500 text-center py-8">
                <p>Error: {error}</p>
            </div>
        );
    }

    const isLoading = loading[dataKey] === "process";
    const isSuccess = loading[dataKey] === "success";
    const hasMore = data.data.length < data.count;

    return (
        <section className="container mx-auto pt-8 px-6 bg-white mt-4 rounded-2xl">
            {console.log(`${dataKey} is`, data)}
            {console.log(hasMore)}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-3xl font-bold text-gray-800">{title}</h3>
                <button
                    className={`!text-md md:!text-lg flex items-center gap-2 text-amber-500 hover:text-amber-600 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        } ${!hasMore ? "hidden" : ""}`}
                    onClick={loadMore}
                    disabled={isLoading}
                >
                    <p>Selengkapnya</p>
                    <FaArrowRight />
                </button>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth cursor-grab select-none"
                style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
            >
                {data.data.length === 0 && isSuccess ? (
                    <div className="text-center w-full py-20 text-gray-500">
                        <p>Belum ada buku baru</p>
                    </div>
                ) : (
                    data.data.map((book, i) => (
                        <CardBook key={i} item={book} />
                    ))
                )}
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                        <div key={idx} className="snap-start flex-shrink-0 w-40">
                            <CardProductPlaceholder />
                        </div>
                    ))
                ) : null}
            </div>
        </section>
    );
};

export default BookSection;
