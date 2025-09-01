import { useEffect } from "react";
import useBookStore from "../app/store/useBookStore";
import CardBook from "./CardProduct";
import { FaArrowRight } from "react-icons/fa";
import CardProductPlaceholder from "./CardProductPlaceholder";


const NewArrivalBooks = () => {
    const { newArrival, loading, error, getNewArrival } = useBookStore();

    useEffect(() => {
        getNewArrival();
    }, []);
    return (
        <section className="container mx-auto pt-8 px-6 bg-white my-4 rounded-2xl">
            {console.log(newArrival)}
            <h3 className="text-3xl font-bold text-gray-800 mb-4">New Arrival Books</h3>
            <div className="flex flex-wrap gap-4">
                {
                    loading === true ? (
                        Array.from({ length: 5 }).map((_, idx) => (
                            <div key={idx} md={3}>
                                <CardProductPlaceholder />
                            </div>
                        ))
                    ) : newArrival.length === 0 ? (
                        <div style={{ textAlign: 'center', width: '100%', padding: '100px 0', color: '#6e736f' }}>
                            <h1>Produk tidak ditemukan</h1>
                        </div>
                    ) : (
                        newArrival.map((book, i) => (
                            <CardBook key={i} item={book} />
                        ))
                    )
                }
                <button className="h-auto flex items-center gap-2 text-amber-500">
                    <p>Selengkapnya</p>
                    <FaArrowRight />
                </button>
            </div>
        </section>
    );
};

export default NewArrivalBooks;