import useCheckRole from "../../../Hooks/useCheckRole.js";
import { useOutletContext } from "react-router-dom"
export const ManagerOrder = () => {
    const {setNotification, currentUser}  = useOutletContext()
    useCheckRole(currentUser)
    return (
        <div>Order</div>
    )
}