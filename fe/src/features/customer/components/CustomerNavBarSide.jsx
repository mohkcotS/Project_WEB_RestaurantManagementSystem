import { svg } from "../../../assets/managerPageSvg"
import { useNavigate, useLocation } from "react-router-dom"
import { Logout } from "../../../components/Logout";
import { useState } from "react";

export const CustomerNavBarSide = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const icons = [
            { id: "user", src: svg.user },
            { id: "table", src: svg.table },
            { id: "order", src: svg.order },
            { id: "logout", src: svg.logout },
        ]
        const selectedIndex = icons.findIndex((icon) => icon.id === location.pathname.split("/")[2]);
        const translateY = selectedIndex * 96;
        const [openLogout, setOpenLogout] = useState(false)
        
    return (
        <div>
            <div className="flex flex-col flex-shrink-0 px-4
                            gap-y-6 items-center pt-32  min-h-screen z-20 sticky top-0 ">


                <div className="absolute w-[72px] h-[72px] border-4 border-cyan-500 rounded-3xl transition-transform duration-500"
                    style={{ transform: `translateY(${translateY}px)` }}></div>


                {icons.map((icon) => (
                    <img key={icon.id} src={icon.src} className="h-[72px] w-[72px] rounded-3xl p-4 cursor-pointer transition-all duration-300 z-10"
                        onClick={() => {

                            if (icon.id === "logout") {
                                setOpenLogout(true)
                            } else {
                                navigate(`/customer/${icon.id}`);
                            }
                        }} 
                        />))}
            </div>
            {openLogout && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><Logout setOpenLogout={setOpenLogout} /></div>  }
        </div>

    )

}