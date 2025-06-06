export const CustomerCard = ({user, setEditId , setOpenDelete, setOpenEdit}) => {
    return (
        <div key={user.id} className="grid grid-cols-[2fr_2fr_2fr_3fr] text-white text-md bg-white/20 py-2 items-center rounded-3xl 
                        text-center hover:scale-105 duration-500">
            <div className=" font-semibold">{user.id}</div>
            <div className=" ">{user.name}</div>
            <div className={`  font-bold 
                ${user.role === "Customer" ? "text-[#96bff1]"
                    : user.role === "Manager" ? "text-[#FFDAB9]"
                        : user.role === "Chef" ? "text-[#D8BFD8]"
                            : "text-[#73f1c3]"}`
            }>
                {user.role}
            </div>
            <div className=" flex gap-5 justify-center text-[14px] font-bold">
                <button
                    onClick={() => { setEditId(user.id); setOpenEdit(true) }}
                    className="rounded-xl border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500 hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2"
                >
                    Edit
                </button>
                <button
                    onClick={() => { setEditId(user.id); setOpenDelete(true) }}
                    className="rounded-xl border-2 border-red-500 hover:cursor-pointer hover:bg-red-500 hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}