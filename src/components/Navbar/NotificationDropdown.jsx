import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { IoIosNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

// Variants animasi
const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.98,
        transition: { duration: 0.15 },
    },
};

const NotificationDropdown = () => {
    const navigate = useNavigate();
    const notifRef = useRef(null);

    const [openNotif, setOpenNotif] = useState(false);

    const toggleNotif = () => setOpenNotif((prev) => !prev);
    useClickOutside(notifRef, () => setOpenNotif(false));

    return (
        <div className="relative" ref={notifRef}>
            <button
                className="hover:text-[#fbe488] transition-colors"
                onClick={toggleNotif}
            >
                <IoIosNotificationsOutline className="text-2xl md:text-4xl" />
            </button>

            <AnimatePresence>
                {openNotif && (
                    <motion.div
                        key="notif-dropdown"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-20 origin-top"
                    >
                        <div className="p-2 border-b font-semibold">Notifikasi</div>
                        <ul className="max-h-60 overflow-y-auto">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Tidak ada notifikasi baru
                            </li>
                        </ul>
                        <button
                            className="p-2 text-center text-sm text-blue-600 hover:underline w-full"
                            onClick={() => navigate("/notification-detail")}
                        >
                            Lihat semua
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationDropdown;
