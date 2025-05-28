import { useState } from "react"
import { PaymentScreen } from "./PaymentScreen"

export const CashierTableCard = ({ tb, setNotification, updateTableList, checkoutIds }) => {
    const [openPayment,setOpenPayment] = useState(false)
    const [selectedTable, setSelectedTable] = useState({})
    return (
        <div className={`relative w-[350px] h-[180px] border-4 p-8 rounded-3xl ${checkoutIds.includes(tb.id) ? "border-yellow-300" : ""}
        ${tb.status === "available" ? " border-white" : "border-white/20"}`}>
            <div className="flex justify-between mb-5">
                <h1 className={`text-xl font-bold text-white ${tb.status === "available" ? "" : "z-10"}`}>{tb.name}</h1>
                <h1 className="text-xl font-bold text-yellow-300">{tb.type}</h1>
            </div>
            <h2 className={`text-center text-xl  ${tb.status === "available" ? "text-green-500" : "text-red-500"}`}>{tb.status}</h2>

            {tb.status === "occupied" && (
                <div className="absolute inset-0 bg-black/90 rounded-3xl flex items-center justify-center">
                    <button
                    onClick={()=>{setOpenPayment(true); setSelectedTable(tb)}}
                        className="relative rounded-xl text-sm border-2 border-blue-500 hover:cursor-pointer
                        hover:bg-blue-500 hover:scale-105 active:scale-95 duration-300
                        text-white px-8 py-2"
                    > Payment </button>
                </div>
            )}

            {openPayment && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <PaymentScreen selectedTable={selectedTable} setOpenPayment={setOpenPayment} setNotification={setNotification} updateTableList={updateTableList} /></div>}

        </div>
    )
}