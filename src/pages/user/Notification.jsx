import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Notifications = () => {
    const [notification, setNotification] = useState(null);
    return (
        <div className="w-screen min-h-screen bg-white pt-12">
            {notification ? (
                <div className="flex justify-between items-center px-5">
                    <h2 className="font-bold text-gray-800">Notifications</h2>
                    <button className="text-gray-700 text-xl hover:bg-gray-100 rounded-md !p-2">
                        <IoClose />
                    </button>
                </div>)
                :
                (<div className="w-screen h-screen flex items-center justify-center">
                    {/* Notification items would go here */}
                    <p className="text-4xl text-gray-600">No new notifications</p>
                </div>)
            }
        </div>
    );
}

export default Notifications;