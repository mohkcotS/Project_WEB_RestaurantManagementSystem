import bgImage from '../../../assets/img/bg.jpg';
import { CashierNavBarTop } from '../components/CashierNavBarTop';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Toast } from '../../../components/Toast';
import { getUserById } from '../../../services/userService';
import { useCheckNotification } from '../../../hooks/useCheckNotification';
import { useState, useEffect } from 'react';
import { CashierNavBarSide } from '../components/CashierNavBarSide';
export const Cashier = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const decode = jwtDecode(sessionStorage.getItem("accessToken"));
    const [currentUser, setCurrentUser] = useState({ id: 0, name: "", role: ""});
    const [notification, setNotification] = useState({ message: "", status: "" });
    useCheckNotification(setNotification)
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

    }, [decode.id, location.pathname, navigate]);

    return (
        <div className="max-w-screen flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <CashierNavBarSide/>
            {/* Main */}
            <div className="relative flex-1">
                <CashierNavBarTop currentUser={currentUser}/>
                <Outlet context={{currentUser, setNotification}} />
            </div>
            {/* Toast */}
            {notification?.message && <div className="z-105"><Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} /></div>}
        </div>
    )
}