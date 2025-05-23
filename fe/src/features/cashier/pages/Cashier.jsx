import bgImage from '../../../assets/img/bg.jpg';
import { CashierNavBarTop } from '../components/CashierNavBarTop';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Toast } from '../../../components/Toast';
import { getUserById } from '../../../services/userService';
import { useCheckNotification } from '../../../hooks/useCheckNotification';
import { useState, useEffect } from 'react';
import { CashierNavBarSide } from '../components/CashierNavBarSide';
import useUserUpdate from '../../../hooks/useUserUpdate';
import socket from '../../../socket';
export const Cashier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const decode = jwtDecode(sessionStorage.getItem("accessToken"));
    const [currentUser, setCurrentUser] = useState({ id: 0, name: "", role: ""});
    const [notification, setNotification] = useState({ message: "", status: "" });
    const [checkoutIds, setCheckoutIds] = useState([])
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
        if (location.pathname === '/cashier') {
            navigate('home');
        }
        getUserInformation(decode.id);

        const savedList = JSON.parse(sessionStorage.getItem("paymentList") || "[]");
        setCheckoutIds(prevCheckoutIds => [...prevCheckoutIds, ...savedList]);
    }, [decode.id, location.pathname, navigate]);

    useEffect(() => {
        sessionStorage.setItem("paymentList", JSON.stringify(checkoutIds));
    }, [checkoutIds]);

    return (
        <div className="max-w-screen flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <CashierNavBarSide/>
            {/* Main */}
            <div className="relative flex-1">
                <CashierNavBarTop currentUser={currentUser}/>
                <Outlet context={{currentUser, setNotification , checkoutIds, setCheckoutIds}} />
            </div>
            {/* Toast */}
            {notification?.message && <div className="z-105"><Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} /></div>}
        </div>
    )
}