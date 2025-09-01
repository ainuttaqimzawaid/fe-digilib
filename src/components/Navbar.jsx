import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../app/store/useAuthStore";
import ProfileButton from "../pages/Profile";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const user = useAuthStore((state) => state.user);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const isAuthenticated = !!user;
  const [query, setQuery] = useState("");


  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // console.log(user)
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



  const [openNotif, setOpenNotif] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setOpenNotif(!openNotif);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenNotif(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled
          ? "bg-[#462d07] shadow-md"
          :
          // "bg-transparent"
          "bg-[#462d07] shadow-md"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          to="/"
          className="!p-0">
          <h1
            className={`text-lg font-bold transition-colors duration-300 ${isScrolled
              ? "text-[#fbe488]"
              : "text-white"
              }`}>
            Cendria
          </h1>
        </Link>
        <ul className={`flex space-x-1 transition-colors duration-300 ${isScrolled
          ? "text-white"
          : "text-white"
          }`}>
          <li><button
            className="hover:text-[#fbe488] transition-colors text-md font-roboto"
            onClick={() => navigate('/')}>Home</button></li>
          <li><button
            className="hover:text-[#fbe488] transition-colors text-md font-roboto"
            onClick={() => navigate('/books')}>Books</button></li>
          <li><button
            className="hover:text-[#fbe488] transition-colors text-md font-roboto"
            onClick={() => navigate('/categories')}>
            Categories</button></li>
          <li><button
            className="hover:text-[#fbe488] transition-colors text-md font-roboto"
            onClick={() => navigate('/my-library')}>My Library</button></li>
        </ul>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books..."
              className={`px-3 py-2 focus:outline-none duration-300 rounded-full text-md transition-colors border border-gray-400 font-roboto ${isScrolled
                ? "text-gray-200 placeholder-gray-500"
                : "bg-white/20 text-white placeholder-white/70 border-white/30"
                }`}
            />
          </form>
          <div className={`flex items-center gap-2 transition-colors duration-300 ${isScrolled ? "text-gray-600" : "text-white"
            }`}>
            {isAuthenticated ? (
              <div className="flex gap-2 text-gray-600">

                <div className="relative inline-block text-left" ref={dropdownRef}>
                  {/* Tombol Notifikasi */}
                  <button className="cursor-pointer hover:text-[#fbe488] transition-colors" onClick={toggleDropdown}>
                    <IoIosNotificationsOutline className="text-4xl text-gray-200" />
                    {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {'jumlah notifikasi'}
                    </span> */}
                  </button>

                  {/* Dropdown */}
                  {openNotif && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-20">
                      <div className="p-2 border-b font-semibold">Notifikasi</div>
                      <ul className="max-h-60 overflow-y-auto">
                        {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          📚 Buku <strong>Filsafat Modern</strong> telah dikembalikan
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          📅 Pengembalian <strong>React Handbook</strong> terlambat 2 hari
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          📕 Buku baru <strong>Sejarah Nusantara</strong> telah ditambahkan
                        </li> */}
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Tidak ada notifikasi baru
                        </li>
                      </ul>
                      <button className="p-2 text-center text-sm text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/notification-detail')}>
                        Lihat semua
                      </button>
                    </div>
                  )}
                </div>
                <ProfileButton />
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-full text-md transition-colors border border-gray-400 font-roboto ${isScrolled
                    ? "text-white hover:bg-[#744c0d]"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-full text-md transition-colors border border-gray-400 font-roboto ${isScrolled
                    ? "bg-[#fbe488] text-black hover:bg-[#744c0d]"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
