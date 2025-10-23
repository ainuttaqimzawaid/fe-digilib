import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileButton from "../../pages/Profile";
import { menus } from "./menuConfig";
import SearchInput from "./SearchInput";
import NotificationDropdown from "./NotificationDropdown";

const NavbarDesktop = ({ isScrolled, isAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="hidden sm:flex justify-between w-full items-center">
            <Link to="/">
                <h1
                    className={`text-lg font-bold transition-colors duration-300 ${isScrolled ? "text-[#fbe488]" : "text-white"
                        }`}
                >
                    Cendria
                </h1>
            </Link>

            {/* Menu */}
            <ul className="flex space-x-4 text-white">
                {menus.map((menu, index) => (
                    <li key={index}>
                        <button
                            className={`px-3 py-2 hover:text-[#fbe488] transition-colors ${location.pathname === menu.path ? "font-bold text-[#fbe488]" : ""
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

            {/* Search + notif + profile */}
            <div className="flex items-center gap-4">
                <SearchInput isScrolled={isScrolled} />

                {isAuthenticated ? (
                    <div className="flex items-center gap-2 text-gray-200">
                        <NotificationDropdown />
                        <ProfileButton />
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-full text-md text-white border border-gray-400 hover:bg-[#744c0d]"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 rounded-full text-md bg-[#fbe488] text-black hover:bg-[#744c0d]"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarDesktop;
