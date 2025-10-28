import { useEffect } from 'react';
import Footer from '../../components/Footer';
import { Route, Routes } from 'react-router-dom';
import Categories from './Category';
import AllBooks from './AllBook';
import MyLibrary from './MyLibrary';
import Notifications from './Notification';
import SearchPage from './SearchPage';
import BookDetail from './BookDetail';
import Home from './Home';
import Navbar from '../../components/Navbar/Navbar';
import AboutUs from './AboutUs';
import TermsandCondition from './TermsCondition';
import MyClub from './MyClub';
import FAQ from './FAQ';

const MainNavigate = () => {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen w-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/books" element={<AllBooks />} />
                <Route path="/my-library" element={<MyLibrary />} />
                <Route path="/notification-detail" element={<Notifications />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/book-club" element={<MyClub />} />
                <Route path="/terms-and-condition" element={<TermsandCondition />} />
                <Route path="/faq" element={<FAQ />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default MainNavigate; 