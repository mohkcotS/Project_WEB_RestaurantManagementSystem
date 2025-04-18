import { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom'

import {Toast} from "../../../components/Toast"
import {CustomerNavBarSide} from "../components/CustomerNavBarSide"
import {CustomerNavBarTop} from "../components/CustomerNavBarTop"
import bgImage from '../../../assets/img/bg.jpg';
import { jwtDecode } from "jwt-decode"

export const Customer= () => {
    const navigate = useNavigate()

    const decode = jwtDecode(sessionStorage.getItem("accessToken"))
    const [currentUser,setCurrentUser] = useState({id : decode.id, name : decode.name , role: decode.role})
    const [selectedIcon, setSelectedIcon] = useState("table");
    const [notification , setNotification] = useState({ message: "", status: "" })
    const [selectedTable, setSelectedTable] = useState({});
    const [confirmation,setConfirmation] = useState(false)
    const [currentOrderId, setCurrentOrderId] = useState({})
    const [] = useState({dish: 0 , price: 0})

    useEffect(() => {
            if (location.pathname === '/customer') {
                navigate('table')
            }
        }, [])
    return (
        <div className="max-w-screen h-auto flex relative bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-0"></div>
            {/* Nav bar */}
            <CustomerNavBarSide selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            {/* Main */}
            <div className="relative flex-1">
                <CustomerNavBarTop selectedIcon = {selectedIcon} currentUser = {currentUser}/>
                <Outlet context={{ currentUser, setCurrentUser, setNotification, selectedTable, setSelectedTable, 
                    confirmation ,setConfirmation,currentOrderId, setCurrentOrderId}} />
            </div>
            {/* Toast */}
            {notification?.message && <div className="z-25"><Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} /></div>}                 
        </div>
    )
}