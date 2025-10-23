import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { IoIosNotificationsOutline } from "react-icons/io";


const NotificationDropdown = () => {
    const navigate = useNavigate();

    const [openNotif, setOpenNotif] = useState(false);

    const notifRef = useRef(null);

    const toggleNotif = () => setOpenNotif(!openNotif);
    useClickOutside(notifRef, () => setOpenNotif(false));

    return (
        <div className="relative" ref={notifRef} >
            <button
                className="hover:text-[#fbe488]"
                onClick={toggleNotif}
            >
                <IoIosNotificationsOutline className="text-2xl md:text-4xl" />
            </button>
            {openNotif && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-20">
                    <div className="p-2 border-b font-semibold">Notifikasi</div>
                    <ul className="max-h-60 overflow-y-auto">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Tidak ada notifikasi baru
                        </li>
                    </ul>
                    <button
                        className="p-2 text-center text-sm text-blue-600 hover:underline"
                        onClick={() => navigate("/notification-detail")}
                    >
                        Lihat semua
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
