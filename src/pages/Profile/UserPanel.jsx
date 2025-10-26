import { IoClose } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { motion } from "motion/react";


const variants = {
    open: {
        opacity: 1,
        pointerEvents: "auto", // aktif
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        opacity: 0,
        pointerEvents: "none", // tidak bisa diklik
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};


const variant = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};


const UserPanel = ({ user, onClose, onLogout, panelRef }) => {

    const handleButtonClick = () => {
        toast.info('😱😱😱 Oh tidaak!! hak akses anda dibatasi!!!');
    };
    return (
        <motion.div
            ref={panelRef}
            variants={variants}
            className="absolute top-0 right-0 w-48 md:w-72 h-screen border rounded shadow-md pt-3"
        >
            {/* {console.log(user)} */}
            <div className="flex justify-between items-center px-5">
                <div className="flex items-center gap-4">
                    {user.avatar ?
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="w-14 h-14 rounded-full border"
                        />
                        :
                        <div className="w-10 h-10 right-2 md:w-14 md:h-14 text-2xl md:text-3xl bg-gray-500 text-white flex items-center justify-center !rounded-full">
                            {user.userName.charAt(0).toUpperCase()}
                        </div>}
                    <p className="font-bold text-gray-800">{user.userName}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-700 text-xl hover:bg-gray-100 rounded-md !p-2"
                >
                    <IoClose />
                </button>
            </div>

            <motion.div
                variants={variant}
                className="p-4 border-b">
                <p className="font-bold text-gray-800">{user.userName}</p>
                <p className="text-gray-600">{user.email}</p>
            </motion.div>

            <div className="flex flex-col">
                {["Edit Profile", "Change Password", "Notifications", "Bantuan"].map((item) => (
                    <motion.button key={item}
                        variants={variant}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleButtonClick}
                        className="px-4 py-2 text-left text-sm">
                        {item}
                    </motion.button>
                ))}

                <div className="absolute bottom-0 w-full px-4 py-4">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-800 font-medium rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                        <LuLogOut />
                        Logout
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default UserPanel;
