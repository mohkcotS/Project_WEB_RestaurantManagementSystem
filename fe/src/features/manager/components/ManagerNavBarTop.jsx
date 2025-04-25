import { useLocation } from "react-router-dom"

export const ManagerNavBarTop = ({ currentUser}) => {
    const location = useLocation();
    const icons = [
        { id: "home", text: "DASH BOARD" },
        { id: "user", text: "USER" },
        { id: "table", text: "TABLE" },
        { id: "order", text: "ORDER" },
        { id: "dish", text: "DISH" },
    ]

    const title = icons.find(icon => icon.id === location.pathname.split("/")[2]).text;

    return(
        <div className="flex flex-col pt-6 px-20">

                    <div className="w-full flex justify-between py-8 px-10">
                        
                        <h1 className="font-bold text-5xl text-cyan-400 tracking-wide">La Ratatouille</h1>
                        

                        <div className="flex gap-10 items-center">
                            <div
                                className="w-18 h-18 bg-white text-cyan-600 flex items-center justify-center text-2xl font-bold 
                                    hover:cursor-pointer rounded-full">
                                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : "NN"}
                            </div>

                            <div className="text-white">
                                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                                <h1 className="text-gray-400">{currentUser.role}</h1>
                            </div>


                        </div>
                        
                    </div>

                    <h1 className="font-bold text-4xl text-white tracking-wide text-center">{title}</h1>
                    
                    
        </div>
    )
}