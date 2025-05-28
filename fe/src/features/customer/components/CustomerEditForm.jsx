import { getUserById, updateUserById } from "../../../services/userService";
import { useEffect, useState } from "react";
import { CustomerDeleteForm } from "./CustomerDeleteForm";

export const CustomerEditForm = ({ editId, setOpenEdit, setNotification, getUserInformation }) => {
    const [user, setUser] = useState({});
    const [changePassword, setChangePassword] = useState(false)
    const [password,setPassword] = useState ({oldPassword:"", newPassword:"",confirmedPassword:""})
    const [openDelete,setOpenDelete] = useState (false)


    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            if(password.newPassword.length <= 2 || password.oldPassword.length <= 2){
                throw new Error("New password must have at least 3 character")
            }
            if (password.newPassword !== password.confirmedPassword) {
                setPassword({newPassword:"",confirmedPassword:""})
                throw new Error("Confirmed password does not match new password.");
            }
            const response = await updateUserById(editId, { password: password.oldPassword, newPassword: password.newPassword });
            getUserInformation(editId);
            setNotification({ message: response.data.message, status: "success" });
            setPassword({ oldPassword: "", newPassword: "", confirmedPassword: "" });

        } catch (error) {
            setNotification({ message: error?.response?.data?.message || error?.message, status: "error" });
        }   
    };

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

    const handleEditInformation = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserById(editId, { name: user.name, phoneNumber : user.phoneNumber });
            getUserInformation(editId);
            setNotification({ message: response.data.message, status: "success" });
        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })

        }
    };

    return (
        <div className=' relative w-[400px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-3 shadow-lg'>
            <div className="grid grid-cols-2 pt-8 items-center text-md font-bold ">
                <div
                    onClick={() => setChangePassword(false)}
                    className="flex flex-col items-center cursor-pointer ">
                    <span className={`${changePassword === true ? "text-black/50" : ""}`}>Edit Information</span>
                    <span className={`h-1 bg-yellow-500 transition-all duration-500 origin-left transform 
                        ${changePassword === false ? "scale-x-100" : "scale-x-0"} w-full rounded-3xl `}></span>
                </div>

                <div
                    onClick={() => setChangePassword(true)}
                    className="flex flex-col items-center cursor-pointer ">

                    <span className={`${changePassword === true ? "" : "text-black/50"}`}>Change Password</span>
                    <span className={`h-1 bg-yellow-500 transition-all duration-500 origin-left transform 
                        ${changePassword === true ? "scale-x-100" : "scale-x-0"} w-full rounded-3xl `}></span>
                </div>
            </div>


            {!changePassword && <div className='flex flex-col gap-y-4 gap-x-6'>
                <div className="flex flex-col gap-2">
                    <h1 className="text-md font-bold text-blue-900">Username</h1>
                    <input
                        className='px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400'
                        type="text"
                        placeholder='Name...'
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-md font-bold text-blue-900">Phone Number</h1>
                    <input
                        className='px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400'
                        type="text"
                        placeholder='Phone Number...'
                        value={user.phoneNumber}
                        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                </div>


                <div className="grid grid-cols-2 gap-x-5">
                    <button
                        onClick={handleEditInformation}
                        className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm hover:cursor-pointer hover:border-green-700
                    transition-all duration-500 hover:scale-105 active:scale-95 text-green-700 font-bold">Save Change</button>
                    <button
                        onClick={()=>{setOpenDelete(true)}}
                        className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm hover:cursor-pointer hover:border-red-700
                    transition-all duration-500 hover:scale-105 active:scale-95 text-red-700 font-bold">Delete Account</button>
                </div>
            </div>}

            {changePassword && <div  className='flex flex-col gap-y-4 gap-x-6'>
                <div className="flex flex-col gap-2">
                    <h1 className="text-md font-bold text-blue-900">Old Password</h1>
                    <input
                        className='px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400'
                        type="password"
                        value={password.oldPassword}
                        placeholder='Old password...'
                        onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-md font-bold text-blue-900">New Password</h1>
                    <input
                        className='px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400'
                        type="password"
                        value={password.newPassword}
                        placeholder='New password...'
                        onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-md font-bold text-blue-900">Confirmed Password</h1>
                    <input
                        className='px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400'
                        type="password"
                        value={password.confirmedPassword}
                        placeholder='Confirmed password...'
                        onChange={(e) => setPassword({ ...password, confirmedPassword: e.target.value })}
                    />
                </div>

                <button
                    onClick={handleChangePassword} disabled={password.oldPassword === "" || password.newPassword === "" || password.confirmedPassword === ""}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl text-sm hover:cursor-pointer hover:border-green-700
                    transition-all duration-500 hover:scale-105 active:scale-95 text-green-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed">Change Password</button>
            </div>}

            <div className="absolute top-5 right-5 text-xl font-bold">
                <button 
                onClick={()=>{setOpenEdit(false)}}
                className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>


            {openDelete && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <CustomerDeleteForm editId={editId} setOpenDelete={setOpenDelete} setNotification={setNotification}/></div>}

        </div>
    );
};
