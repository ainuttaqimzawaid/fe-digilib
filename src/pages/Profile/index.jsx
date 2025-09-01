import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../app/store/useAuthStore";
import UserPanel from "./UserPanel";
import { useClickOutside } from "./useClickOutside";

const ProfileButton = () => {
    const user = useAuthStore((state) => state.user);

    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef(null);
    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    useClickOutside(panelRef, () => setIsOpen(false));

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <section className={`${isOpen ? 'w-screen h-screen bg-gray-300/30 absolute left-0 top-0' : ''} `}>
            {/* {console.log(user)} */}
            {isOpen ?
                <UserPanel
                    user={user}
                    onClose={() => setIsOpen(false)}
                    onLogout={handleLogout}
                    panelRef={panelRef}
                />
                :
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle user panel"
                    className="rounded-full !p-0"
                >
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
                </button>
            }
        </section>
    );
};

export default ProfileButton;
