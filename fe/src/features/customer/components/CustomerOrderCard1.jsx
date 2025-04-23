import { DateAndTimeUtils } from "../utils/DateAndTimeUtils";

export const CustomerOrderCard1 = ({order, setOpenSeeDetail, setSelectedOrder}) => {
    const { date } = DateAndTimeUtils(order.createdAt);

    return (
        <div className="w-full grid grid-cols-5 place-items-center font-bold text-white text-xl
                        bg-white/20 py-4 items-center rounded-2xl  text-center mb-3 hover:scale-105 duration-500">
            <h1>{order.id}</h1>
            <h1>{date}</h1>
            <h1>{order.total_Price}</h1>
            <h1>{order.status}</h1>
            <button
            onClick={()=>{setOpenSeeDetail(true); setSelectedOrder(order);}}
            className="max-w-[150px] px-6 py-2 border-2 border-white/50 rounded-xl text-lg hover:cursor-pointer  
            transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold hover:border-green-500 ">See Detail</button>
        </div>
    )
}