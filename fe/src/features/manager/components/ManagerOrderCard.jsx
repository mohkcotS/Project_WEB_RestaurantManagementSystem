export const ManagerOrderCard = ({ order, setOpenSeeDetail, setSelectedOrder , setOpenEdit }) => {

    return (
        <div className="w-full grid grid-cols-[2fr_3fr_3fr_3fr_3fr]  text-white text-md place-items-center
                        bg-white/20 py-2 items-center rounded-2xl text-center hover:scale-105 duration-500">
            <h1 className="font-bold ">{order.id}</h1>
            <h1 >{order.date}</h1>
            <h1 >{order.total_Price}</h1>
            <h1 className={` font-bold ${order.status === 'pending' ? "text-orange-300" : "text-green-300"}`}>{order.status}</h1>
            <div className="flex gap-3 ">
                <button
                    onClick={()=>{setOpenSeeDetail(true); setSelectedOrder(order);}}
                    className="w-[90px] px-6 py-2 border-2 border-gray-500 rounded-xl text-sm hover:cursor-pointer  
            transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold hover:bg-gray-500 ">Detail</button>
                <button
                    onClick={()=>{setOpenEdit(true); setSelectedOrder(order);}}
                    className="w-[90px] px-6 py-2 border-2 border-blue-500 rounded-xl text-sm hover:cursor-pointer  
            transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold hover:bg-blue-500 ">Edit</button>

            </div>

        </div>
    )
}