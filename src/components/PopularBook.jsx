import { useEffect, useRef, useState } from "react";
import useBookStore from "../app/store/useBookStore";
import CardBook from "./CardProduct";
import { FaArrowRight } from "react-icons/fa";
import CardProductPlaceholder from "./CardProductPlaceholder";

const PopularBooks = () => {
  const { favoriteBooks, loading, getFavoriteBooks } = useBookStore();
  const [cursor, setCursor] = useState({ lastReadCount: null, lastId: null });
  let limit = 5;
  const scrollRef = useRef(null);

  // Fetch awal
  useEffect(() => {
    getFavoriteBooks({ limit });
  }, [getFavoriteBooks]);

  // Fetch data berikutnya (lazy load)
  const getNextFavoriteBooks = async () => {
    const lastBook = favoriteBooks.data[favoriteBooks.data.length - 1];
    if (!lastBook) return;

    const nextCursor = {
      lastReadCount: lastBook.readCount,
      lastId: lastBook.id,
    };

    await getFavoriteBooks({
      limit,
      lastReadCount: nextCursor.lastReadCount,
      lastId: nextCursor.lastId,
    });

    setCursor(nextCursor);
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
    <section className="container mx-auto pt-8 px-6 bg-white mt-4 rounded-2xl">
      {console.log(favoriteBooks)}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-bold mb-4">Reader's Favorite Books</h3>

        <div className="flex justify-end mt-2">
          <button
            className={`flex items-center gap-2 text-amber-500 hover:text-amber-600 transition ${loading.favoriteBooks === "process" ? "opacity-50 cursor-not-allowed" : ""
              } ${favoriteBooks.data.length >= favoriteBooks.count ? "hidden" : ""}`}
            onClick={getNextFavoriteBooks}
            disabled={loading.favoriteBooks === "process"}
          >
            <p>Selengkapnya</p>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Wrapper scrollable */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth cursor-grab select-none"
        style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
      >
        {loading.favoriteBooks === "success" && favoriteBooks.data.length === 0 ? (
          <div className="w-full text-center text-gray-500 py-20">
            <h1>Produk tidak ditemukan</h1>
          </div>
        ) : (
          favoriteBooks.data.map((book, i) => (
            <div key={i} className="snap-start flex-shrink-0 w-48 hover:scale-[1.02] transition-transform">
              <CardBook item={book} />
            </div>
          ))
        )}

        {/* Placeholder saat loading */}
        {loading.favoriteBooks === "process" &&
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="snap-start flex-shrink-0 w-48">
              <CardProductPlaceholder />
            </div>
          ))}
      </div>
    </section >
  );
};

export default PopularBooks;
