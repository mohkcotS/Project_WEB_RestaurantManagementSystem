import { getUserById, updateUserById } from "../../../services/userService";
import { useEffect, useState } from "react";
import socket from "../../../socket";

export const Manager_UserEditForm = ({ editId , setOpenEdit, setNotification , updateUserList}) => {
    const [user, setUser] = useState({ name: "", role: "" });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(editId);
                setUser(response.data); 
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (editId) fetchUser();
    }, [editId]);

    const handleSubmit = async (e)   => {
        e.preventDefault();
        try {
            const response = await updateUserById(editId,user)
            updateUserList();
            setOpenEdit(false)
            socket.emit("user-update",user)
            socket.emit("update-user-board")
            setNotification({ message: response.data.message , status: "success" })
            
        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })
        }
    }

    return (
        <div className='w-[400px] h-auto rounded-3xl bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-xl font-bold'>
                <h2 className='text-blue-500'>Edit User Information</h2>
                <button onClick={()=> setOpenEdit(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-3 text-sm '>
                <input 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    type="text" 
                    placeholder='Name...'
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />

                <select 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                    <option value="Customer">Customer</option>
                    <option value="Manager">Manager</option>
                    <option value="Chef">Chef</option>
                    <option value="Cashier">Cashier</option>
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
