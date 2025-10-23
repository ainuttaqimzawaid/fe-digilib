import { useEffect, useRef, useState } from "react";
import useBookStore from "../app/store/useBookStore";
import CardBook from "./CardProduct";
import { FaArrowRight } from "react-icons/fa";
import CardProductPlaceholder from "./CardProductPlaceholder";


const NewRelease = () => {
    const { newRelease, loading, error, getNewRelease } = useBookStore();
    const [cursor, setCursor] = useState(null); // ⬅️ ganti offset → cursor
    const limit = 5;
    const scrollRef = useRef(null);

    useEffect(() => {
        // Fetch pertama
        getNewRelease({ limit });
    }, [getNewRelease]);

    const loadMore = async () => {
        // Ambil nextCursor dari state
        const nextCursor = newRelease.nextCursor;
        if (!nextCursor) return;

        // Fetch berikutnya pakai cursor
        const data = await getNewRelease({
            limit,
            lastId: nextCursor.lastId,
            lastYear: nextCursor.lastYear,
        });

        // Simpan cursor baru
        setCursor(data.nextCursor);
    };

    // --- Drag scroll (klik-tahan untuk geser)
    useEffect(() => {
        const slider = scrollRef.current;
        let isDown = false;
        let startX;
        let scrollLeft;

        if (!slider) return;

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
            const walk = (x - startX) * 1.5; // kecepatan geser
            slider.scrollLeft = scrollLeft - walk;
        };

        // event listener
        slider.addEventListener("mousedown", startDragging);
        slider.addEventListener("mouseleave", stopDragging);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mousemove", move);

        // cleanup
        return () => {
            slider.removeEventListener("mousedown", startDragging);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mousemove", move);
        };
    }, []);

    if (error) {
        return (
            <div className="text-red-500 text-center py-8">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <section className="container mx-auto pt-8 px-6 bg-white mt-4 rounded-2xl">
            {console.log(newRelease)}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">New Release</h3>
                <div className="flex justify-end mt-2">
                    <button
                        className={`flex items-center gap-2 text-amber-500 hover:text-amber-600 transition ${loading.newRelease === "process" ? "opacity-50 cursor-not-allowed" : ""
                            } ${newRelease.data.length >= newRelease.count ? "hidden" : ""}`}
                        onClick={loadMore}
                        disabled={loading.newRelease === "process"}
                    >
                        <p>Selengkapnya</p>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth cursor-grab select-none"
                style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
            >
                {
                    loading.newRelease && newRelease.length === 'success' ? (
                        <div style={{ textAlign: 'center', width: '100%', padding: '100px 0', color: '#6e736f' }}>
                            <h1>Produk tidak ditemukan</h1>
                        </div>
                    ) : (
                        newRelease.data.map((book, i) => (
                            <CardBook key={i} item={book} />
                        ))
                    )
                }

                {
                    loading.newRelease === 'process' ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} md={3}>
                                <CardProductPlaceholder />
                            </div>
                        ))
                    ) : null
                }
            </div>
        </section>
    );
};

export default NewRelease;