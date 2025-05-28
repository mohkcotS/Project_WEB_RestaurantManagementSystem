import { useState } from "react";
import { svg } from "../../../assets/managerPageSvg"
import {useNavigate, useLocation } from "react-router-dom"
import { Logout } from "../../../components/Logout";

export const CashierNavBarSide = ({setSelectedIcon }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openLogout, setOpenLogout] = useState(false)
    const icons = [
        { id: "home", src: svg.home },
        { id: "logout", src: svg.logout },
    ]
    const selectedIndex = icons.findIndex((icon) => icon.id === location.pathname.split("/")[2]);
    const translateY = selectedIndex * 84;
    return (
        <div>
            <div className="flex flex-col flex-shrink-0 px-4
                            gap-y-5 items-center pt-32  min-h-screen z-20 sticky top-0 ">


                <div className="absolute w-[60px] h-[60px] border-4  border-cyan-500 rounded-3xl transition-transform duration-500"
                    style={{ transform: `translateY(${translateY}px)` }}></div>


                {icons.map((icon) => (
                    <img key={icon.id} src={icon.src} className="h-[60px] w-[60px] rounded-3xl p-4 cursor-pointer transition-all duration-300 z-10"
                        onClick={() => {

                            if (icon.id === "logout") {
                                setOpenLogout(true)
                            } else {
                                setSelectedIcon(icon.id);
                                navigate(`/cashier/${icon.id}`);
                            }
                        }} />))}
            </div>
            
            {openLogout && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><Logout setOpenLogout={setOpenLogout} /></div>  }
        </div>

    )

}