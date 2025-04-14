import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/userService";
import { UserCreateForm } from "../components/UserCreateForm";
import { UserDeleteForm } from "../components/UserDeleteForm";
import { Toast } from "../../../components/Toast";
import { Manager_UserEditForm } from "../components/Manager_UserEditForm";

export const ManagerUser = ({currentUser,setCurrentUser,setNotification}) => {
    const [users, setUsers] = useState([]);
    // Open model
    const [openForm, setOpenForm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    
    const [editId, seteditId] = useState(null);
    // Search
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("All");




    const updateUserList = async () => {
        const response = await getAllUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllUsers();
            setUsers(response.data);
        };
        fetchData();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === "All" || user.role === selectedRole;
        return matchesName && matchesRole;
      });

    return (
        <div className="w-[80%] h-auto mx-auto flex flex-col my-10 gap-10 ">
            <div className="flex justify-between">
                <div className="flex justify-between items-center gap-10">
                    <input
                        type="text"
                        placeholder="Search user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-10 py-4 border-2 border-white rounded-xl text-white focus:outline-none text-xl"
                    />

                    <select name="" id="" className="px-10 py-4 border-2 border-white rounded-xl text-white focus:outline-none text-xl"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="All" className="text-black">All</option>
                        <option value="Manager" className="text-black">Manager</option>
                        <option value="Chef" className="text-black">Chef</option>
                        <option value="Cashier" className="text-black">Cashier</option>
                        <option value="Customer" className="text-black">Customer</option>
                    </select>

                </div>

                <div>
                    <button onClick={()=> setOpenForm(true)}
                     className="px-8 py-3 border-2 border-white rounded-xl text-xl hover:cursor-pointer hover:text-green-400  transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">
                        Create user
                    </button>
                </div>
            </div>


            <div className="w-full">
                <div className=" flex text-yellow-300  text-center text-2xl font-bold">
                    <div className="w-1/8">ID</div>
                    <div className="w-3/8">Name</div>
                    <div className="w-2/8">Role</div>
                    <div className="w-2/8">Action</div>
                </div>

                <hr className="text-white mt-5 mb-10" />

                {filteredUsers.map(user => (
                    <div key={user.id} className="flex text-white  text-xl bg-white/20 py-4 items-center rounded-3xl 
                                    text-center mb-3 hover:scale-105 duration-500">
                        <div className="w-1/8 font-semibold">{user.id}</div>
                        <div className="w-3/8">{user.name}</div>
                        <div className={`w-2/8 font-bold 
                        ${user.role === "Customer" ? "text-[#AEEEEE]" : (user.role === "Manager" ? "text-[#FFDAB9]": (user.role === "Chef" ? "text-[#D8BFD8]": "text-[#B5EAD7]") ) }`}>
                        {user.role}</div>


                        <div className="w-2/8 flex gap-5 justify-center text-[16px] font-bold">
                            <button onClick={()=>  {seteditId(user.id); setOpenEdit(true)}}
                            className="rounded-xl border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500  hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 ">Edit</button>
                            <button onClick={()=> {seteditId(user.id);setOpenDelete(true)}} className="rounded-xl border-2 border-red-500 hover:cursor-pointer hover:bg-red-500 hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 ">Delete</button>
                        </div>
                    </div>
                ))}
                

            </div>
            
            {/* form */}
            {openForm && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><UserCreateForm setOpenForm = {setOpenForm} setNotification = {setNotification} updateUserList = {updateUserList}/></div>}
            {/* Edit form */}
            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><Manager_UserEditForm editId={editId} setOpenEdit= {setOpenEdit} setNotification = {setNotification} updateUserList = {updateUserList} currentUser = {currentUser} setCurrentUser = {setCurrentUser} /></div>}
            {/* Delete form */}
            {openDelete && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><UserDeleteForm editId={editId} setOpenDelete = {setOpenDelete} setNotification = {setNotification} updateUserList = {updateUserList} /></div>}

        </div>
    )
}