import { ChefOrderCard } from "../components/ChefOrderCard"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { ChefOrderDetailCard } from "../components/ChefOrderDetailCard"
import { getAllPendingOrders } from "../../../services/orderService"
import { getFullAllOrderDetail } from "../../../services/order_detailService";
import socket from "../../../socket";

export const ChefHome = () =>{ 
    const {setNotification}  = useOutletContext()
    const [orders,setOrders] = useState([])
    const [openOrderDetail,setOpenOrderDetail] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [orderDishesMap, setOrderDishesMap] = useState({});



    const fetchOrderDishes = async (orderId) => {
    try {
        const response = await getFullAllOrderDetail(orderId);
        setOrderDishesMap(prev => ({ ...prev, [orderId]: response.data }));
    } catch (error) {
        console.log(error);
    }
    };

     const load = async () => {
        const res = await getAllPendingOrders();
        setOrders(res.data);
        for (let order of res.data) {
            fetchOrderDishes(order.id); 
        }
    };

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        socket.on("receive-new-order", load);
        return () => {
            socket.off("receive-new-order", load);
        };
    }, []);    

    return(
  
        <div className="w-[80%] mx-auto flex flex-col my-10 ">
            {orders.length > 0 ? <div className="grid grid-cols-4 gap-10 ">
                {orders.map(order =>(
                    <ChefOrderCard setOpenOrderDetail={setOpenOrderDetail} dishes={orderDishesMap[order.id] || []} order ={order} setSelectedOrder={setSelectedOrder}/>
                ))}
            </div> : <div className="text-white text-2xl font-bold text-center mt-10">
                    There is no order
                
                </div>}
            
            {openOrderDetail && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            
            <ChefOrderDetailCard setOpenOrderDetail={setOpenOrderDetail} order={selectedOrder} 
            setNotification={setNotification} dishes={orderDishesMap[selectedOrder.id] || []} fetchOrderDishes={fetchOrderDishes} load={load}/></div>}      
   
        </div>

    )
}