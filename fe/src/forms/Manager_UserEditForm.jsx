import axios from "axios";
import { getUserById, updateUserById } from "../services/userService";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"


export const Manager_UserEditForm = ({ editId , setOpenEdit, setNotification , updateUserList, currentUser, setCurrentUser }) => {
    const [user, setUser] = useState({ name: "", role: "" });
    const [currentRole,setCurrentRole] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(editId);
                setUser(response.data); 
                setCurrentRole(response.data.role)
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
            if(currentUser.id === editId){
                if(currentRole !== user.role){
                    setNotification({ message: "Role is changed. Please login again", status: "success" })
                    sessionStorage.removeItem("accessToken");
                    navigate("/")
                }
                else{
                    const newToken = response.data.accessToken
                    sessionStorage.setItem("accessToken", newToken)
                    const decoded = jwtDecode(newToken);
                    setCurrentUser({ id: decoded.id, name: decoded.name, role: decoded.role });
                    setNotification({ message: response.data.message, status: "success" });
                }
                
            }
            else{
                setNotification({ message: response.data.message , status: "success" })
            }
        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })
        }
    }

    return (
        <div className='w-[450px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-2xl font-bold'>
                <h2 className='text-blue-500'>Edit User Information</h2>
                <button onClick={()=> setOpenEdit(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 '>
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
                    Submit
                </button>
            </form>
        </div>
    );
};
