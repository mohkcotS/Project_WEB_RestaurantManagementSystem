import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import useCheckRole from "../../../Hooks/useCheckRole";
import { CashierTableCard } from "../components/CashierTableCard";
import { getAllTables } from "../../../services/tableService";

export const CashierHome = () => {
    const {setNotification, currentUser}  = useOutletContext()
    const [tables, setTables] = useState([])
    const [editId, seteditId] = useState(null);
    useCheckRole(currentUser)

    const updateTableList = async () => {
        try {
            const response = await getAllTables();
            setTables(response.data);
        } catch (error) {
            console.log(error)
        }
            
    };

    useEffect(() => {
        updateTableList()
    }, []);
    return(
        <div className="w-[80%] mx-auto flex flex-col my-10">
            <div className="grid grid-cols-3 place-items-center gap-10">
            {tables.map(tb => (<CashierTableCard tb={tb} setNotification={setNotification} updateTableList={updateTableList} />)) }
            </div>
            
        </div>
    )
}