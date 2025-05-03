import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/userService";
import { UserCreateForm } from "../components/UserCreateForm";
import { UserDeleteForm } from "../components/UserDeleteForm";
import { Manager_UserEditForm } from "../components/Manager_UserEditForm";
import { useOutletContext } from "react-router-dom"
import useCheckRole from "../../../Hooks/useCheckRole";
import { CustomerCard } from "../components/CustomerCard";

export const ManagerUser = () => {
    const { currentUser, setCurrentUser, setNotification, getUserInformation } = useOutletContext()
    const [users, setUsers] = useState([]);
    // Open model
    const [openForm, setOpenForm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [editId, setEditId] = useState(null);
    // Search
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("All");

    useCheckRole(currentUser)
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
                    <button onClick={() => setOpenForm(true)}
                        className="px-8 py-3 border-2 border-white rounded-xl text-xl hover:cursor-pointer hover:text-green-400  transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">
                        Create user
                    </button>
                </div>
            </div>


            <div className="w-full">
                <div className="grid grid-cols-[2fr_2fr_2fr_3fr] text-yellow-300 text-center text-2xl font-bold px-10 ">
                    <div>ID</div>
                    <div>NAME</div>
                    <div>ROLE</div>
                    <div>ACTION</div>
                </div>

                <hr className="text-white m-5" />
                <div className=" overflow-y-auto max-h-[600px] overflow-x-visible px-10">
                    {filteredUsers && filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <CustomerCard user={user} setEditId={setEditId} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete}/>
                        ))
                    ) : (
                        <div className="text-white text-2xl font-bold text-center mt-10">
                            No customers found
                        </div>
                    )}

                </div>



            </div>

            {/* form */}
            {openForm && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><UserCreateForm setOpenForm={setOpenForm} setNotification={setNotification} updateUserList={updateUserList} /></div>}
            {/* Edit form */}
            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><Manager_UserEditForm editId={editId} setOpenEdit={setOpenEdit} setNotification={setNotification} updateUserList={updateUserList} currentUser={currentUser} setCurrentUser={setCurrentUser} getUserInformation={getUserInformation} /></div>}
            {/* Delete form */}
            {openDelete && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><UserDeleteForm editId={editId} setOpenDelete={setOpenDelete} setNotification={setNotification} updateUserList={updateUserList} /></div>}

        </div>
    )
}