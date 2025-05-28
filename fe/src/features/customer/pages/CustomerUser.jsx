import { MdLoyalty, MdCardMembership } from "react-icons/md";
import { FaPhone, FaUser } from "react-icons/fa";
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import { getOrderByUserId } from "../../../services/userService";
import { CustomerOrderCard1 } from "../components/CustomerOrderCard1";
import { OrderDetailCard } from "../../../components/OrderDetailCard";
import { CustomerEditForm } from "../components/CustomerEditForm";

export const CustomerUser = () => {
    const {currentUser, setNotification , getUserInformation} = useOutletContext()
    const [openEdit,setOpenEdit] = useState(false)
    const [openSeeDetail,setOpenSeeDetail] = useState(false)
    const [selectedOrder,setSelectedOrder] = useState({})
    const [orders, setOrders] = useState([])
    
    const getUserOrder = async (id) => {
        try {
            const response = await getOrderByUserId(id)
            setOrders(response.data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (currentUser?.id) {
            getUserOrder(currentUser.id);
        }
    }, [currentUser.id]);
    return (
        <div className="w-[80%] h-auto mx-auto flex flex-col p-10 relative">
            <div className="w-full grid grid-cols-2 pl-10 gap-10 ">
                <div className="flex items-center gap-5">
                    <FaUser size={30} className="text-white"/>
                    <h1 className="font-bold text-xl text-gray-300">Username: <span className="pl-4 text-2xl text-red-300">{currentUser.name}</span> </h1>
                </div>

                <div className="flex items-center gap-5">
                    <FaPhone size={30} className="text-white"/>
                    <h1 className="font-bold text-xl text-gray-300">Phone number: <span className="pl-4 text-2xl text-red-300">{currentUser.phoneNumber}</span> </h1>
                </div>

                <div className="flex items-center gap-5">
                    <MdCardMembership size={30} className="text-white"/>
                    <h1 className="font-bold text-xl text-gray-300">Membership Tier: <span className="pl-4 text-2xl text-red-300">{currentUser.tier}</span> </h1>
                </div>

                <div className="flex items-center gap-5">
                    <MdLoyalty size={30} className="text-white"/>
                    <h1 className="font-bold text-xl text-gray-300">Current point: <span className="pl-4 text-2xl text-red-300">{currentUser.currentPoints}</span></h1>
                </div>
            </div>

            <h1 className="text-2xl text-yellow-300 text-center font-bold m-8">ORDER HISTORY</h1>

            <div className="w-full grid grid-cols-5 text-gray-300 text-xl font-bold place-items-center px-10">
                <h1>Order ID</h1>
                <h1>Date</h1>
                <h1>Total Price</h1>
                <h1>Status</h1>
                <h1>Action</h1>
            </div>

            <hr className="text-gray-300 m-5 "/>

            <div className="overflow-y-auto max-h-[380px] overflow-x-visible px-10">
            {orders.map(order=> 
                (<CustomerOrderCard1 order={order} setOpenSeeDetail={setOpenSeeDetail} setSelectedOrder={setSelectedOrder}/>)
            )}
            </div>
            
            

            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <CustomerEditForm editId={currentUser.id} setOpenEdit={setOpenEdit} setNotification={setNotification} getUserInformation={getUserInformation}/></div>}
            
            {openSeeDetail && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <OrderDetailCard setOpenSeeDetail ={setOpenSeeDetail} selectedOrder={selectedOrder} isPayment={false}/></div>}
            
            <div className="absolute -top-10 -right-5">
                <button 
                onClick={()=>{setOpenEdit(true)}}
                className="w-[140px] mx-auto px-4 py-3 border-2 border-white rounded-xl text-sm hover:cursor-pointer hover:text-green-400  
                transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">Edit profile</button>
            </div>    

        </div>
    )
}