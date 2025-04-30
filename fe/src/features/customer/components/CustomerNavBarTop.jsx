import { useLocation } from "react-router-dom"
import { NavBarTop } from "../../../components/NavBarTop";

export const CustomerNavBarTop = ({currentUser}) => {
    const location = useLocation();
    const icons = [
        { id: "user", text: "USER" },
        { id: "table", text: "TABLE" },
        { id: "order", text: "ORDER" },
    ]

    const title = icons.find(icon => icon.id === location.pathname.split("/")[2]).text;

    return(
        <NavBarTop currentUser={currentUser} title={title}/>
    )
}