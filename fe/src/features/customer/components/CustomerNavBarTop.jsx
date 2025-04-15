import { useLocation } from "react-router-dom"
export const CustomerNavBarTop = ({selectedIcon , currentUser}) => {
    const location = useLocation();
    const icons = [
        { id: "user", text: "USER" },
        { id: "table", text: "TABLE" },
        { id: "order", text: "ORDER" },
        { id: "logout"  },
    ]

    const title = icons.find(icon => icon.id === location.pathname.split("/")[2]).text;

    return(
        <div className="flex justify-between py-8 px-20">

                    <h1 className="font-bold text-5xl text-white tracking-wide">{title}</h1>
                    

                    <div className="flex gap-10 items-center">
                        <div
                            className="w-18 h-18 bg-white text-cyan-600 flex items-center justify-center text-2xl font-bold 
                                hover:cursor-pointer rounded-full">
                                {currentUser.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="text-white">
                            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                            <h1 className="text-gray-400">{currentUser.role}</h1>
                        </div>


                    </div>
                    
        </div>
    )
}