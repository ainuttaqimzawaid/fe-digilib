import { useState, useEffect } from "react";
import { useAuthStore } from "../../app/store/useAuthStore";
import { menus } from "./menuConfig";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const user = useAuthStore((state) => state.user);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const isAuthenticated = !!user;

  // ====== Scroll behavior ======
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    getCurrentUser();
  }, []);


  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "bg-[#462d07] shadow-md" : "bg-[#462d07]"}`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4">

        {/* ===== MOBILE ===== */}
        <NavbarMobile
          isAuthenticated={isAuthenticated}
          menus={menus}
        />

        {/* ===== DESKTOP ===== */}
        <NavbarDesktop
          isScrolled={isScrolled}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </nav>
  );
};

export default Navbar;
