import { getTableById, updateTableById } from "../../../services/tableService";
import { useEffect, useState } from "react";

export const TableEditForm = ({ editId , setOpenEdit, setNotification , updateTableList}) => {
    const [table, setTable] = useState({ name: "", type: "", status: "" });

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const response = await getTableById(editId);
                setTable(response.data); 
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (editId) fetchTable();
    }, [editId]);

    const handleSubmit = async (e)   => {
        e.preventDefault();
        try {
            const response = await updateTableById(editId,table)
            updateTableList();
            setOpenEdit(false)
            setNotification({ message: response.data.message , status: "success" })
            
        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })
        }
    }

    return (
        <div className='w-[450px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-2xl font-bold'>
                <h2 className='text-blue-500'>Edit Table Information</h2>
                <button onClick={()=> setOpenEdit(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 '>
                <input 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    type="text" 
                    placeholder='Name...'
                    value={table.name}
                    onChange={(e) => setTable({ ...table, name: e.target.value })}
                />

                <select 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    value={table.type}
                    onChange={(e) => setTable({ ...table, type: e.target.value })}
                >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>

                <select 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    value={table.status}
                    onChange={(e) => setTable({ ...table, status: e.target.value })}
                >
                    <option value="available">available</option>
                    <option value="occupied">occupied</option>

                </select>

                

                

                <button 
                    className='mx-auto w-[50%] bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 
                    hover:w-[70%] transition-all duration-700 cursor-pointer'>
                    Update
                </button>
            </form>
        </div>
    );
};
