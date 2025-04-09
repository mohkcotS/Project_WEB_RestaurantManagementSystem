import { ManagerHome } from "./ManagerHome"
import { ManagerUser } from "./ManagerUser"
import { ManagerTable } from "./ManagerTable"
import bgImage from '../assets/img/bg1.jpg';
import { NavBarSide } from "../components/NavBarSide"
import { NavBarTop } from "../components/NavBarTop"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Logout } from "./Logout";


export const Manager = () => {
    const decode = jwtDecode(sessionStorage.getItem("accessToken"))
    const [selectedIcon, setSelectedIcon] = useState("home");
    const [currentUser,setCurrentUser] = useState({id : decode.id, name : decode.name , role: decode.role})

    


    return (
        <div className="max-w-screen h-auto flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <NavBarSide selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            {/* Main */}
            
            <div className="relative flex-1">
                <NavBarTop selectedIcon = {selectedIcon} currentUser = {currentUser}/>
                {selectedIcon === 'home' && <ManagerHome />}
                {selectedIcon === 'user' && <ManagerUser currentUser = {currentUser} setCurrentUser = {setCurrentUser}/>}
                {selectedIcon === 'table' && <ManagerTable />}
                {selectedIcon === 'logout' && <Logout/>}
            </div>
        </div>
    )
}