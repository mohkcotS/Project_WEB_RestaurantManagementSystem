import { useLocation } from "react-router-dom"
import { NavBarTop } from "../../../components/NavBarTop";

export const ManagerNavBarTop = ({ currentUser}) => {
    const location = useLocation();
    const icons = [
        { id: "home", text: "DASH BOARD" },
        { id: "user", text: "USER" },
        { id: "table", text: "TABLE" },
        { id: "order", text: "ORDER" },
        { id: "payment", text: "PAYMENT" },
        { id: "dish", text: "DISH" },
    ]

    const title = icons.find(icon => icon.id === location.pathname.split("/")[2]).text;

    return(
        <NavBarTop currentUser={currentUser} title={title}/>
    )
}