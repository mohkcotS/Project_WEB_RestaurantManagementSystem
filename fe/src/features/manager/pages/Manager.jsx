import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ManagerNavBarSide } from "../components/ManagerNavBarSide";
import { ManagerNavBarTop } from "../components/ManagerNavBarTop";
import { Toast } from "../../../components/Toast";
import bgImage from '../../../assets/img/bg.jpg';
import { jwtDecode } from "jwt-decode";
import { getUserById } from '../../../services/userService';
import { useCheckNotification } from '../../../hooks/useCheckNotification';
import socket from '../../../socket';
import useUserUpdate from '../../../hooks/useUserUpdate';

export const Manager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const decode = jwtDecode(sessionStorage.getItem("accessToken"));
    const [currentUser, setCurrentUser] = useState({ id: 0, name: "", role: ""});
    const [notification, setNotification] = useState({ message: "", status: "" });
    useCheckNotification(setNotification)
    useUserUpdate(socket,currentUser)
    const getUserInformation = async (id) => {
        try {
            const response = await getUserById(id);
            setCurrentUser({
                id : response.data.id,
                name : response.data.name,
                role : response.data.role
            
            });
        }
        catch (error) {
            setNotification({ message: "Failed to load user data.", status: "error" });
        }
    };

    useEffect(() => {
        getUserInformation(decode.id);
        socket.emit("user-join", { userId: decode.id });
    }, [decode.id, location.pathname, navigate]);

    return (
        <div className="max-w-screen h-auto flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <ManagerNavBarSide/>
            {/* Main */}
            <div className="relative flex-1">
                <ManagerNavBarTop currentUser={currentUser} />
                <Outlet context={{ currentUser, setCurrentUser, setNotification, getUserInformation }} />
            </div>
            {/* Toast */}
            {notification?.message && <div className="z-25"><Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} /></div>}
        </div>
    );
};
