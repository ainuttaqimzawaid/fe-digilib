import { useEffect } from 'react';
import Hero from '../../components/Hero';
import Category from '../../components/Category';
import PopularBooks from '../../components/PopularBook';
import CTA from '../../components/CTA'

const Home = () => {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen">
            <Hero />
            <Category />
            <PopularBooks />
            <CTA />
        </div>
    );
};

export default Home; 