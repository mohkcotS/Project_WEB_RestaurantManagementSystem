export const ManagerPaymentCard = ({ payment,  setSelectedPayment , setOpenEdit }) => {

    return (
        <div className="w-full grid grid-cols-7  text-white text-md place-items-center
                        bg-white/20 py-2 items-center rounded-2xl text-center hover:scale-105 duration-500">
            <h1 className="font-bold text-lg ">{payment.id}</h1>
            <h1 className="font-bold text-lg">{payment.OrderId}</h1>
            <h1 >{payment.date}</h1>
            <h1 >{payment.amount}</h1>
            <h1 >{payment.method}</h1>
            <h1 className={` font-bold ${payment.status === 'success' ? "text-green-300" : payment.status === 'failed' ? "text-red-300" : "text-orange-300"}`}>{payment.status}</h1>
            
            <button
                    onClick={()=>{setOpenEdit(true); setSelectedPayment(payment);}}
                    className="w-[100px] px-6 py-2 border-2 border-blue-500 rounded-xl text-sm hover:cursor-pointer  
            transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold hover:bg-blue-500 ">Edit</button>



        </div>
    )
}