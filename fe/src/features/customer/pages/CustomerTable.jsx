import { useState, useEffect } from "react"
import { getAllTables } from "../../../services/tableService";
import { useOutletContext } from "react-router-dom"
import { TableConfirmation } from "../components/TableConfirmation";
import { CustomerTableCard } from "../components/CustomerTableCard";
import socket from "../../../socket";

export const CustomerTable = () => {
    const [tables, setTables] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const {selectedTable, setSelectedTable, confirmation ,setConfirmation, setNotification, currentUser, setCurrentOrder} = useOutletContext()
    const updateTableList = async () => {
            const response = await getAllTables();
            setTables(response.data);
        };

    useEffect(() => {
        updateTableList(); 
    }, []);

    useEffect(()=>{
        socket.on("update-for-new-order",updateTableList)
        socket.on("receive-update-tables-status",updateTableList)

        return () => {
            socket.off("update-for-new-order");
            socket.off("receive-update-tables-status",updateTableList)

        };
    },[])


    return (
        <div className="w-[80%] h-auto mx-auto flex flex-col my-10 gap-20">
            <div className="w-[100%] text-white flex flex-col gap-10">
                <div className="flex justify-between">
                    <div className="flex gap-20">
                        <h1 className="text-white text-4xl">Your selected table: </h1>
                        <h1 className="text-yellow-300 text-4xl font-bold">{selectedTable.name}</h1>
                    </div>
                    
                    <button disabled={confirmation} onClick={()=> {setOpenEdit(true)}}
                        className="px-8 py-3 border-2 border-white rounded-xl text-xl hover:cursor-pointer
                        hover:text-green-400  transition-all duration-500 hover:scale-105 active:scale-95
                         text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                        Confirm
                    </button>
                    
                </div>
                <div className="flex flex-col gap-10">
                    <div className="w-[100%] grid grid-cols-3 gap-x-30 gap-y-15 mx-auto ">
                        {tables
                            .map(tb => (
                                <CustomerTableCard tb={tb} selectedTable={selectedTable} confirmation={confirmation} setSelectedTable={setSelectedTable}/>
                            ))}
                    </div>
                </div>
            </div>
            
            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <TableConfirmation selectedTable={selectedTable} setOpenEdit={setOpenEdit} setConfirmation = {setConfirmation} 
            setNotification = {setNotification} updateTableList = {updateTableList} selectedUser={currentUser.id} 
            setCurrentOrder = {setCurrentOrder}
            /></div>}

        </div>
    )
}