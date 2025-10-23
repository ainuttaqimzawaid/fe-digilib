import { useEffect } from 'react';
import Hero from '../../components/Hero';
// import PopularBooks from '../../components/PopularBook';
// import NewRelease from '../../components/NewRelease';
// import NewArrivalBooks from '../../components/NewArrivalBook';
import BookSection from '../../components/BookSection';
import useBookStore from '../../app/store/useBookStore';

const Home = () => {
    const favoriteBooks = useBookStore((state) => state.favoriteBooks);
    const newArrival = useBookStore((state) => state.newArrival);
    const newRelease = useBookStore((state) => state.newRelease);
    const getFavoriteBooks = useBookStore((state) => state.getFavoriteBooks);
    const loading = useBookStore((state) => state.loading);
    const error = useBookStore((state) => state.error);
    const getNewArrival = useBookStore((state) => state.getNewArrival);
    const getNewRelease = useBookStore((state) => state.getNewRelease);
    // const {
    //     favoriteBooks,
    //     newArrival,
    //     newRelease,
    //     loading,
    //     error,
    //     getFavoriteBooks,
    //     getNewArrival,
    //     getNewRelease,
    // } = useBookStore();
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen">
            <Hero />
            <BookSection
                title="Favorite Books"
                dataKey="favoriteBooks"
                data={favoriteBooks}
                loading={loading}
                error={error}
                getData={getFavoriteBooks}
            />
            <BookSection
                title="New Release Books"
                dataKey="newRelease"
                data={newRelease}
                loading={loading}
                error={error}
                getData={getNewRelease}
            />
            <BookSection
                title="New Arrival Books"
                dataKey="newArrival"
                data={newArrival}
                loading={loading}
                error={error}
                getData={getNewArrival}
            />
        </div>
    );
};

export default Home; 