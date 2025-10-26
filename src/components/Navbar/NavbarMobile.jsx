import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import ProfileButton from "../../pages/Profile";
import { menus } from "./menuConfig";
import Logo from "../../assets/images/Letter C Logo With Education and Book Concept._20250408_193234_0000.png";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import NotificationDropdown from "./NotificationDropdown";
import SearchInput from "./SearchInput";
import { motion } from "motion/react";

const NavbarMobile = ({ isAuthenticated, isScrolled }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const inputRef = useRef(null);

    const menuRef = useRef(null);

    const toggleButtonRef = useRef(null);


    const lineProps = {
        transition: { duration: 0.4, ease: "easeInOut" },
        stroke: "white",
        strokeWidth: 3.5, // sedikit lebih tebal biar jelas di ukuran besar
        strokeLinecap: "round",
    };

    // ====== Fokus otomatis ke input search ======
    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch]);
    useClickOutside(inputRef, () => setShowSearch(false));

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    useClickOutside(menuRef, (e) => {
        // Jika klik masih di dalam tombol toggle, jangan tutup menu
        if (toggleButtonRef.current && toggleButtonRef.current.contains(e.target)) {
            return;
        }
        setIsMenuOpen(false);
    });

    return (
        <div className="w-full  sm:hidden">
            {console.log(isMenuOpen)}
            <div className="flex w-full items-center justify-between">
                {/* Left: menu + search */}
                <div className="flex items-center gap-2" ref={menuRef}>
                    {/* <button onClick={toggleMenu} className="text-white !p-1">
                        {isMenuOpen ? (
                            <FaXmark className="w-6 h-6" />
                        ) : (
                            <HiOutlineBars3 className="w-6 h-6" />
                        )}
                    </button> */}
                    <button
                        ref={toggleButtonRef}
                        onClick={toggleMenu}
                        className="w-8 h-8 flex items-center justify-center !p-0 rounded-full hover:bg-gray-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24">
                            {/* Garis 1 */}
                            <motion.line
                                x1="3"
                                y1="6"
                                x2="21"
                                y2="6"
                                {...lineProps}
                                animate={
                                    isMenuOpen
                                        ? { y1: 12, y2: 12, rotate: 45 }
                                        : { y1: 6, y2: 6, rotate: 0 }
                                }
                                style={{ originX: "50%", originY: "50%" }}
                            />

                            {/* Garis 2 */}
                            <motion.line
                                x1="3"
                                y1="12"
                                x2="21"
                                y2="12"
                                {...lineProps}
                                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                            />

                            {/* Garis 3 */}
                            <motion.line
                                x1="3"
                                y1="18"
                                x2="21"
                                y2="18"
                                {...lineProps}
                                animate={
                                    isMenuOpen
                                        ? { y1: 12, y2: 12, rotate: -45 }
                                        : { y1: 18, y2: 18, rotate: 0 }
                                }
                                style={{ originX: "50%", originY: "50%" }}
                            />
                        </svg>
                    </button>

                    {/* Search button/input */}
                    <div className="relative flex items-center">
                        {!showSearch && (
                            <button
                                type="button"
                                onClick={() => setShowSearch(true)}
                                className="text-white focus:outline-none !p-1"
                            >
                                <FaSearch className="w-5 h-5" />
                            </button>
                        )}

                        {showSearch && (
                            <SearchInput
                                inputRef={inputRef}
                                isScrolled={isScrolled}
                            />
                        )}
                    </div>
                </div>

                {/* Center: Logo (gambar khusus mobile) */}
                <Link to="/" className="flex justify-center items-center">
                    <img
                        src={Logo}
                        alt="Cendria Logo"
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* Right: notif + profile */}
                {isAuthenticated ? (
                    <div className="flex items-center gap-2 text-gray-200">
                        <NotificationDropdown />
                        <ProfileButton />
                    </div>
                ) :
                    showSearch ? null : (
                        <div className="flex gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-full text-white border border-gray-400 hover:bg-[#744c0d]"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded-full bg-[#fbe488] text-black hover:bg-[#744c0d]"
                            >
                                Sign up
                            </Link>
                        </div>
                    )
                }

            </div>
            {/* ===== Mobile Menu Dropdown ===== */}

            {isMenuOpen && (
                <ul
                    ref={menuRef}
                    className="flex flex-col sm:hidden bg-[#462d07] text-white border-t border-gray-600">
                    {menus.map((menu, index) => (
                        <li key={index}>
                            <button
                                className={`block w-full text-left px-4 py-2 hover:text-[#fbe488] ${location.pathname === menu.path ? "text-[#fbe488]" : ""
                                    }`}
                                onClick={() => {
                                    if (menu.path === "/my-library" && !isAuthenticated) {
                                        navigate("/login");
                                    } else {
                                        navigate(menu.path);
                                    }
                                    setIsMenuOpen(false);
                                }}
                            >
                                {menu.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NavbarMobile;
