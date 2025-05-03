import { ChefOrderCard } from "../components/ChefOrderCard"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import useCheckRole from "../../../Hooks/useCheckRole";
import { ChefOrderDetailCard } from "../components/ChefOrderDetailCard"
import { getAllPendingOrders } from "../../../services/orderService"

export const ChefHome = () =>{ 
    const {setNotification, currentUser}  = useOutletContext()
    useCheckRole(currentUser)
    const [orders,setOrders] = useState([])
    const [openOrderDetail,setOpenOrderDetail] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [reload, setReload] = useState(false)


    const fetchOrder = async () => {
        try {
            const response = await getAllPendingOrders()
            setOrders(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchOrder()
    },[])
     
    return(
  
        <div className="w-[80%] mx-auto flex flex-col my-10 ">
            {orders.length > 0 ? <div className="grid grid-cols-4 gap-10 ">
                {orders.map(order =>(
                    <ChefOrderCard setOpenOrderDetail={setOpenOrderDetail} order ={order} setSelectedOrder={setSelectedOrder} 
                    reload={reload} />
                ))}
            </div> : <div className="text-white text-2xl font-bold text-center mt-10">
                    There is no order
                
                </div>}
            
            {openOrderDetail && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            
            <ChefOrderDetailCard setOpenOrderDetail={setOpenOrderDetail} order={selectedOrder} 
            setNotification={setNotification} reload={reload} setReload={setReload} fetchOrder={fetchOrder}/></div>}      
   
        </div>

    )
}