import { deleteUserById } from "../../../services/userService"


export const UserDeleteForm = ({editId, setOpenDelete, setNotification, updateUserList}) => {

    const handleSubmit = async (e)   => {
            e.preventDefault();
            try {
                const response = await deleteUserById(editId)
                updateUserList();
                setOpenDelete(false)
                setNotification({ message: response.data.message , status: "success" })
                
            } catch (error) {
                setNotification({ message: error.response.data.message, status: "error" })
            }
        }


    return (
        <div className='w-[400px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-xl font-bold'>
                <h2 className='text-blue-500'>Delete User</h2>
                <button onClick={()=>setOpenDelete(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>

            <div className="flex flex-col items-center gap-5 text-sm">
                <h2 className="font-bold text-center text-lg"> Do you want to delete this user? </h2>
                <div className="flex gap-20">
                    <button onClick={handleSubmit} className="rounded-xl hover:cursor-pointer bg-red-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">Delete</button>
                    <button onClick={()=>{setOpenDelete(false)}} className="rounded-xl hover:cursor-pointer bg-green-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">Cancel</button>
                </div>
            </div>          
            
        </div>
    )
}