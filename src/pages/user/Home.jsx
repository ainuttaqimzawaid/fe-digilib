import { useEffect } from 'react';
import Hero from '../../components/Hero';
import PopularBooks from '../../components/PopularBook';
import NewRelease from '../../components/NewRelease';
import NewArrivalBooks from '../../components/NewArrivalBook';

const Home = () => {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen">
            <Hero />
            <PopularBooks />
            <NewRelease />
            <NewArrivalBooks />
        </div>
    );
};

export default Home; 