import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import { Toast } from "../../../components/Toast"
import { CustomerNavBarSide } from "../components/CustomerNavBarSide"
import { CustomerNavBarTop } from "../components/CustomerNavBarTop"
import bgImage from '../../../assets/img/bg.jpg';
import { jwtDecode } from "jwt-decode"
import { getUserById } from '../../../services/userService';
import { getRewardByUserId } from "../../../services/rewardService";

export const Customer = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const decode = jwtDecode(sessionStorage.getItem("accessToken"))
    const [currentUser, setCurrentUser] = useState({ id: 0, name: "", role: "", phoneNumber: "", currentPoints: 0, tier: "" });
    const [selectedIcon, setSelectedIcon] = useState("table");
    const [notification, setNotification] = useState({ message: "", status: "" })
    const [selectedTable, setSelectedTable] = useState({});
    const [confirmation, setConfirmation] = useState(false)
    const [currentOrder, setCurrentOrder] = useState({})
    const [] = useState({ dish: 0, price: 0 })

    const getUserInformation = async (id) => {
        try {
            const response = await getUserById(id);
            const response1 = await getRewardByUserId(id);

            setCurrentUser({
                id: response.data.id,
                name: response.data.name,
                role: response.data.role,
                phoneNumber: response.data.phoneNumber || "",
                currentPoint: response1.data.currentPoints,
                tier: response1.data.tier
            });
        }


        catch (error) {
            console.error("Error fetching user data:", error);
            setNotification({ message: "Failed to load user data.", status: "error" });
        }
    };

    useEffect(() => {
        if (location.pathname === '/customer') {
            navigate('table');
        }
        getUserInformation(decode.id);

    }, [decode.id, location.pathname, navigate]);

    return (
        <div className="max-w-screen h-auto flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <CustomerNavBarSide selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            {/* Main */}
            <div className="relative flex-1">
                <CustomerNavBarTop selectedIcon={selectedIcon} currentUser={currentUser} />
                <Outlet context={{
                    currentUser, setCurrentUser, setNotification, selectedTable, setSelectedTable,
                    confirmation, setConfirmation, currentOrder, setCurrentOrder, getUserInformation
                }} />
            </div>
            {/* Toast */}
            {notification?.message && <div className="z-25"><Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} /></div>}
        </div>
    )
}