import { useState, useEffect } from "react"
import { getAllTables } from "../../../services/tableService";
import {TableCreateForm} from "../components/TableCreateForm";
import {TableEditForm} from "../components/TableEditForm";
import {TableDeleteForm} from "../components/TableDeleteForm";


export const ManagerTable = ({setNotification}) => {
    const [tables, setTables] = useState([])
    const [openCreate,setOpenCreate] = useState(false)
    const [openEdit,setOpenEdit] = useState(false)
    const [openDelete,setOpenDelete] = useState(false)

    const [editId, seteditId] = useState(null);

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

            <div className="flex justify-between">
                <div>
                    <button
                        onClick={()=>{setOpenCreate(true)}}
                        className="px-8 py-3 border-2 border-white rounded-xl text-xl hover:cursor-pointer hover:text-green-400  transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">
                        Create table
                    </button>
                </div>
            </div>

            <div className="w-[100%] text-white flex flex-col gap-10">
                <div className="flex flex-col gap-10">
                    <div className="w-[100%] grid grid-cols-3 gap-x-30 gap-y-15 mx-auto ">
                        {tables
                            .map(tb => (
                                <div className={`relative w-[400px] h-[200px] border-4 p-8 rounded-3xl ${tb.status === "available" ? " border-white" : "border-white/40"} `}>
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl font-bold">{tb.name}</h1>
                                        <h1 className="text-2xl font-bold text-yellow-300">{tb.type}</h1>
                                    </div>
                                    <h2 className={`text-center text-2xl mb-5 ${tb.status === "available" ? "text-green-500" : "text-red-500"}`}>{tb.status}</h2>

                                    <div className="flex justify-center gap-10">
                                        <button 
                                        onClick={()=>  {seteditId(tb.id); setOpenEdit(true)}}
                                        className="rounded-xl border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500  hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 z-1">Edit</button>
                                        <button 
                                        onClick={()=>  {seteditId(tb.id); setOpenDelete(true)}}
                                        className="rounded-xl border-2 border-red-500 hover:cursor-pointer hover:bg-red-500 hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 ">Delete</button>
                                    </div>

                                    {tb.status === "occupied" && <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>} 


                                </div>
                                
                            ))}
                    </div>
                </div>

                

            </div>
            {/*create table */}
            {openCreate && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><TableCreateForm setOpenCreate={setOpenCreate} setNotification={setNotification} updateTableList = {updateTableList}/></div>}
            {/*edit table */}
            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><TableEditForm editId = {editId} setOpenEdit={setOpenEdit} setNotification={setNotification} updateTableList = {updateTableList}/></div>}
            {/* Delete form */}
            {openDelete && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><TableDeleteForm editId={editId} setOpenDelete = {setOpenDelete} setNotification = {setNotification} updateTableList = {updateTableList} /></div>}
            
        </div>
    )
}