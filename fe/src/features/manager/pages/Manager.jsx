import { ManagerHome} from "../pages/ManagerHome";
import { ManagerDish} from "../pages/ManagerDish";
import { ManagerTable} from "../pages/ManagerTable";
import { ManagerUser} from "../pages/ManagerUser";
import { Toast } from "../../../components/Toast";
import bgImage from '../../../assets/img/bg.jpg';
import {ManagerNavBarSide} from "../components/ManagerNavBarSide"
import {ManagerNavBarTop} from "../components/ManagerNavBarTop"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Logout } from "../../../components/Logout";


export const Manager = () => {
    const decode = jwtDecode(sessionStorage.getItem("accessToken"))
    const [selectedIcon, setSelectedIcon] = useState("home");
    const [currentUser,setCurrentUser] = useState({id : decode.id, name : decode.name , role: decode.role})
    const [notification , setNotification] = useState({ message: "", status: "" })

    return (
        <div className="max-w-screen h-auto flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <ManagerNavBarSide selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            {/* Main */}
            
            <div className="relative flex-1">
                <ManagerNavBarTop selectedIcon = {selectedIcon} currentUser = {currentUser}/>
                {selectedIcon === 'home' && <ManagerHome />}
                {selectedIcon === 'user' && <ManagerUser currentUser = {currentUser} setCurrentUser = {setCurrentUser} setNotification = {setNotification}/>}
                {selectedIcon === 'table' && <ManagerTable setNotification = {setNotification}/>}
                {selectedIcon === 'food' && <ManagerDish setNotification = {setNotification} />}
                {selectedIcon === 'logout' && <Logout/>}
            </div>
            {/* Toast */}
            {notification?.message && <div className="z-25"><Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} /></div>}                 
        </div>
    )
}