import { IoClose } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const UserPanel = ({ user, onClose, onLogout, panelRef }) => {
    return (
        <div
            ref={panelRef}
            className="absolute top-0 right-0 w-72 h-screen bg-white border border-gray-200 rounded shadow-md pt-6"
        >
            <div className="flex justify-between items-center px-5">
                <div className="flex items-center gap-4">
                    {user.avatar ?
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="w-14 h-14 rounded-full border"
                        />
                        :
                        <div className="w-14 h-14 text-3xl bg-gray-500 text-white flex items-center justify-center rounded-full">
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

            <div className="p-4 border-b">
                <p className="font-bold text-gray-800">{user.userName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <div className="flex flex-col">
                {["Edit Profile", "Change Password", "Notifications", "Bantuan"].map((item) => (
                    <button key={item} className="px-4 py-2 text-left text-sm hover:bg-gray-100">
                        {item}
                    </button>
                ))}

                <div className="absolute bottom-0 w-full px-4 py-4">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                        <LuLogOut />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
