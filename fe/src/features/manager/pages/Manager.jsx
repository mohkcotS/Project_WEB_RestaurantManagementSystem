import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {ManagerNavBarSide} from "../components/ManagerNavBarSide"
import {ManagerNavBarTop} from "../components/ManagerNavBarTop"
import { Toast } from "../../../components/Toast";
import bgImage from '../../../assets/img/bg.jpg';
import { jwtDecode } from "jwt-decode"


export const Manager = () => {
    const navigate = useNavigate()
    const decode = jwtDecode(sessionStorage.getItem("accessToken"))
    const [selectedIcon, setSelectedIcon] = useState("home");
    const [currentUser,setCurrentUser] = useState({id : decode.id, name : decode.name , role: decode.role})
    const [notification , setNotification] = useState({ message: "", status: "" })

    useEffect(() => {
        if (location.pathname === '/manager') {
            navigate('home')
        }
    }, [])

    return (
        <div className="max-w-screen h-auto flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <ManagerNavBarSide selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            {/* Main */}
            <div className="relative flex-1">
                <ManagerNavBarTop selectedIcon = {selectedIcon} currentUser = {currentUser}/>
                <Outlet context={{ currentUser, setCurrentUser, setNotification }} />
                
            </div>

            {/* Toast */}
            {notification?.message && <div className="z-25"><Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} /></div>}                 
        </div>
    )
}