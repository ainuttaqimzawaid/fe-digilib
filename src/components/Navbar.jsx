import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle background transparency
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Handle navbar visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & not at top
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // const handleLogout = () => {
  //   logout();
  // };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className={`text-lg font-bold transition-colors duration-300 ${isScrolled ? "text-blue-600" : "text-white"
          }`}>
          Cendria
        </h1>
        <ul className={`flex space-x-6 transition-colors duration-300 ${isScrolled ? "text-gray-600" : "text-white"
          }`}>
          <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-blue-600 transition-colors">Categories</a></li>
          <li><a href="#" className="hover:text-blue-600 transition-colors">New Arrivals</a></li>
          <li><a href="#" className="hover:text-blue-600 transition-colors">My Books</a></li>
        </ul>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search books..."
            className={`border px-3 py-2 rounded-md focus:outline-none transition-colors duration-300 ${isScrolled
              ? "bg-white text-gray-800 placeholder-gray-500"
              : "bg-white/20 text-white placeholder-white/70 border-white/30"
              }`}
          />
          {/* <div className={`flex items-center gap-2 transition-colors duration-300 ${isScrolled ? "text-gray-600" : "text-white"
            }`}>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {user?.name || 'User'}
                </span>
                <div className="flex gap-2">
                  <Link
                    to="/profile"
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isScrolled
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isScrolled
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isScrolled
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isScrolled
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
