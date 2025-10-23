import { useEffect, useRef, useState } from "react";
import useBookStore from "../app/store/useBookStore";
import CardBook from "./CardProduct";
import { FaArrowRight } from "react-icons/fa";
import CardProductPlaceholder from "./CardProductPlaceholder";


const NewArrivalBooks = () => {
    const { newArrival, loading, error, getNewArrival } = useBookStore();
    const limit = 5;
    const scrollRef = useRef(null);

    const [cursor, setCursor] = useState(null); // ganti offset → cursor

    useEffect(() => {
        // Fetch pertama (tanpa cursor)
        getNewArrival({ limit });
    }, [getNewArrival]);

    const getNextNewArrivalBooks = async () => {
        // Ambil nextCursor dari state
        const nextCursor = newArrival.nextCursor;
        if (!nextCursor) return;

        // Fetch berikutnya pakai cursor
        const data = await getNewArrival({
            limit,
            lastCreatedAt: nextCursor.lastCreatedAt, // cursor berdasarkan tanggal
            lastId: nextCursor.lastId,
        });

        // Simpan cursor baru (opsional kalau mau track di state)
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

    return (
        <section className="container mx-auto pt-8 px-6 bg-white my-4 rounded-2xl">
            {console.log(newArrival)}
            {/* {console.log(newArrival.data.length >= newArrival.count)} */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">New Arrival Books</h3>
                <div className="flex justify-end mt-2">
                    <button
                        className={`flex items-center gap-2 text-amber-500 hover:text-amber-600 transition ${loading.newArrival === "process" ? "opacity-50 cursor-not-allowed" : ""
                            } ${newArrival.data.length >= newArrival.count ? "hidden" : ""}`}
                        onClick={getNextNewArrivalBooks}
                        disabled={loading.newArrival === "process"}
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
                    loading.newArrival && newArrival.length === 'success' ? (
                        <div style={{ textAlign: 'center', width: '100%', padding: '100px 0', color: '#6e736f' }}>
                            <h1>Produk tidak ditemukan</h1>
                        </div>
                    ) : (
                        newArrival.data.map((book, i) => (
                            <CardBook key={i} item={book} />
                        ))
                    )
                }

                {
                    loading.newArrival === 'process' ? (
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

export default NewArrivalBooks;