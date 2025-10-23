import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CardBook from "../../components/CardProduct";
import useBookStore from "../../app/store/useBookStore";
import CardProductPlaceholder from "../../components/CardProductPlaceholder";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const { allBooks, loading, getAllBooks } = useBookStore();
  const query = useQuery().get("q") || "";

  useEffect(() => {
    getAllBooks({ search: query })
  }, [query]);

  return (
    <section className="container mx-auto py-20 md:py-32 px-6 min-h-screen">
      {console.log(allBooks)}
      <h1 className="!text-2xl md:!text-5xl font-bold mb-4">Hasil pencarian: {query}</h1>
      <div className='flex flex-wrap gap-6'>
        {
          loading.allBooks === 'success' && allBooks.data.length === 0 ? (
            <div style={{ textAlign: 'center', width: '100%', padding: '100px 0', color: '#6e736f' }}>
              <h1>Buku tidak ditemukan</h1>
            </div>
          ) : (
            allBooks.data.map((book, i) => (
              <CardBook key={i} item={book} />
            ))
          )
        }

        {
          loading.allBooks === 'process' ? (
            Array.from({ length: 8 }).map((_, idx) => (
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

export default SearchPage;
