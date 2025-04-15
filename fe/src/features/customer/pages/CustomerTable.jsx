import { useState, useEffect } from "react"
import { getAllTables } from "../../../services/tableService";
import { useOutletContext } from "react-router-dom"
import { TableConfirmation } from "../components/TableConfirmation";

export const CustomerTable = () => {
    const [tables, setTables] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const {selectedTable, setSelectedTable, confirmation ,setConfirmation, setNotification } = useOutletContext()

    const updateTableList = async () => {
            const response = await getAllTables();
            setTables(response.data);
        };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllTables();
            setTables(response.data);
        };
        fetchData();
    }, []);


    return (
        <div className="w-[80%] h-auto mx-auto flex flex-col my-10 gap-20">
            <div className="w-[100%] text-white flex flex-col gap-10">
                <div className="flex justify-between">
                    <div className="flex gap-20">
                        <h1 className="text-white text-4xl">Your selected table: </h1>
                        <h1 className="text-yellow-300 text-4xl font-bold">{selectedTable.name}</h1>
                    </div>
                    
                    <button disabled={confirmation} onClick={()=> {setOpenEdit(true)}}
                        className="px-8 py-3 border-2 border-white rounded-xl text-xl hover:cursor-pointer hover:text-green-400  transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">
                        Confirmation
                    </button>
                    
                </div>
                <div className="flex flex-col gap-10">
                    <div className="w-[100%] grid grid-cols-3 gap-x-30 gap-y-15 mx-auto ">
                        {tables
                            .map(tb => (
                                <div className={`relative w-[400px] h-[200px] border-4 p-8 rounded-3xl 
                                ${tb.status === "available" ? " border-white" : "border-white/20"} 
                                ${(tb.id !== selectedTable.id && confirmation === true ) ? " border-white/20" : ""} 

                                `}>
                                    <div className="flex justify-between">
                                        <h1 className={`text-2xl font-bold 
                                            ${(tb.status === "available" && confirmation === false ) ? " border-white" : "border-white/20"} 
                                            ${(tb.id === selectedTable.id && confirmation === true ) ? "z-1" : "z-0"}
                                        `}>{tb.name}</h1>
                                        <h1 className="text-2xl font-bold text-yellow-300">{tb.type}</h1>
                                    </div>
                                    <h2 className={`text-center text-2xl mb-5 
                                        ${tb.status === "available" ? "text-green-500" : "text-red-500"}`}>{tb.status}</h2>

                                    <div className="flex justify-center gap-10">
                                        <button 
                                        onClick={()=>  {setSelectedTable(tb)}}
                                        className="rounded-xl border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500  hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2">Choose</button>
                                    </div> 
                                    {tb.status === "occupied" && <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>} 
                                    {tb.id === selectedTable.id && <div className="absolute inset-0 bg-black/90 rounded-3xl flex justify-center items-center text-3xl font-bold">Your Table</div>} 
                                    {(tb.id !== selectedTable.id && confirmation === true ) && <div className="absolute inset-0 bg-black/70 rounded-3xl flex justify-center items-center text-3xl"></div>} 
                                     
                                    
                                </div>
                                
                            ))}
                    </div>
                </div>
            </div>
            
            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> <TableConfirmation selectedTable={selectedTable} setOpenEdit={setOpenEdit} setConfirmation = {setConfirmation} setNotification = {setNotification} updateTableList = {updateTableList} /></div>}

        </div>
    )
}