import { useAuthStore } from "../../app/store/useAuthStore";
import UserPanel from "./UserPanel";
import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, useCycle } from "motion/react";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const panelRef = useRef(null);
    const navigate = useNavigate();
    const getInitialCircleX = () => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            return "calc(100% - 80px)";
        }
        return "calc(100% - 40px)";
    };

    const [circleX, setCircleX] = useState(getInitialCircleX);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!user) return null;

    useEffect(() => {
        const updateCirclePosition = () => {
            if (window.innerWidth >= 768) {
                // tablet atau desktop
                setCircleX("calc(100% - 80px)");
            } else {
                // mobile
                setCircleX("calc(100% - 40px)");
            }
        };

        updateCirclePosition(); // jalankan saat pertama render
        window.addEventListener("resize", updateCirclePosition);

        return () => window.removeEventListener("resize", updateCirclePosition);
    }, []);

    // 👇 varian sidebar pakai posisi dinamis
    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at ${circleX} 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
            },
        }),
        closed: {
            clipPath: `circle(19px at ${circleX} 33px)`,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <motion.section
            ref={containerRef}
            initial={false}
            animate={isOpen ? "open" : "closed"}
        >
            {/* {console.log(isOpen)} */}
            {isOpen && (
                <motion.div className="absolute top-0 right-0 h-screen w-screen bg-gray-300/30" />
            )}

            <motion.div
                variants={sidebar}
                className="absolute top-0 right-0 h-screen w-48 md:w-72 bg-white"
            />

            <UserPanel
                user={user}
                onClose={() => toggleOpen()}
                onLogout={handleLogout}
                panelRef={panelRef}
            />

            {isOpen ? '' : (
                <AnimatePresence initial={false}>
                    <button
                        onClick={() => toggleOpen()}
                        className="relative w-10 h-10 md:w-14 md:h-14 text-2xl md:text-3xl right-1 md:right-0 bg-gray-500 text-white flex items-center justify-center !rounded-full"
                    >
                        {user.avatar ?
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="w-14 h-14 rounded-full border"
                            />
                            :
                            <div className="w-8 h-8 md:w-14 md:h-14 text-2xl md:text-3xl bg-gray-500 text-white flex items-center justify-center rounded-full">
                                {user.userName.charAt(0).toUpperCase()}
                            </div>}
                    </button>
                </AnimatePresence>
            )}
        </motion.section>
    );
};

export default ProfileButton;
