import { CustomerOrderCard } from "../components/CustomerOrderCard";
import { CustomerOrderedCard } from "../components/CustomerOrderedCard";
import { useState } from "react";
import { getAllOrderDetails } from "../../../services/order_detailService";
import { useMemo } from "react";
import { OrderPanelFooter } from "./OrderPanelFooter";
import { OrderDetailCard } from "../../../components/OrderDetailCard";


export const CustomerOrderPanel = ({ cart, setCart, openPanel, setOpenPanel, currentOrder, setOrderConfirmation }) => {
    const [newOrder,setNewOrder] = useState(true)
    const [orderedCart, setOrderedCart] = useState([])
    const [openSeeDetail, setOpenSeeDetail] = useState(false)

    const handleOrdered = async () =>{
        try {
            const response = await getAllOrderDetails(currentOrder.id)
            setOrderedCart(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const totalPriceOrdered = useMemo(() => {
        return orderedCart.reduce((acc, item) => acc + item.totalPrice, 0);
    }, [orderedCart]);
    
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.dish.price, 0);


    return (
        <>
            {openSeeDetail && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
                <OrderDetailCard setOpenSeeDetail={setOpenSeeDetail} selectedOrder={currentOrder} isPayment={true}/>
            </div>}
            
            {openPanel ?
                (<div className="h-[700px] bg-black rounded-3xl flex flex-col overflow-hidden border-2 border-gray-300">

                    <div className="flex-1 flex flex-col gap-3 overflow-hidden">

                        <div className="h-[70px] p-5 text-xl text-white grid grid-cols-2 font-bold ">
                            <div
                            onClick={()=>setNewOrder(true)}
                             className={`text-center py-4 cursor-pointer ${newOrder ? "text-yellow-300" :""}`}>New Order</div>
                            <div 
                            onClick={()=> {setNewOrder(false); handleOrdered();}}
                            className={`text-center py-4 cursor-pointer ${newOrder ? "" :"text-yellow-300"}`}>Ordered</div>
                        </div>

                        <hr className="text-white/70 "/>

                        <div className="grid grid-cols-[5fr_2fr_3fr] gap-5 text-gray-400 px-6 font-bold text-md ">
                            <h1 className="  w-48 ">Name</h1>
                            <h1 className="  ">Price</h1>
                            <h1 className="  ">Quantity</h1>
                        </div>

                        {newOrder && <div className="flex-1 flex flex-col overflow-y-auto px-6 ">
                            {cart.map(order => (
                                <CustomerOrderCard order={order} cart={cart} setCart={setCart} />
                            ))}
                        </div>}

                        {!newOrder &&<div className="flex-1 flex flex-col overflow-y-auto px-6">
                            {orderedCart.map(order => (
                                <CustomerOrderedCard order={order} />
                            ))}
                        </div>}

                        
                    </div>

                    {newOrder && <OrderPanelFooter openPanel={openPanel} setOpenPanel={setOpenPanel} order={1} 
                    cart={cart} price={totalPrice} butTitle={"Place Order"} color={"bg-green-500"} style={""} rounded={""} setOrderConfirmation={setOrderConfirmation}/>}

                    {!newOrder && <OrderPanelFooter openPanel={openPanel} setOpenPanel={setOpenPanel} setOpenSeeDetail={setOpenSeeDetail} order={0} currentOrder={currentOrder}
                    cart={orderedCart} price={totalPriceOrdered} butTitle={"Request Payment"} color={"bg-blue-500"} style={""} rounded={""} setOrderConfirmation={setOrderConfirmation}/>}
                    
                    
                </div>) :

                (      <OrderPanelFooter
                        openPanel={openPanel} setOpenPanel={setOpenPanel} order={1} setNewOrder={setNewOrder}
                        cart={cart} price={totalPrice} butTitle={"Place Order"} color={"bg-green-500"} 
                        style={"bg-black/80 rounded-2xl shadow-md shadow-white/50 hover:scale-105 active:scale-95"} 
                        rounded={"rounded-r-2xl"} setOrderConfirmation={setOrderConfirmation}/>
                )
            }
        </>
    )
}