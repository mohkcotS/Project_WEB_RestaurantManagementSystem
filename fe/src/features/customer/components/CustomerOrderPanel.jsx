import { CustomerOrderCard } from "../components/CustomerOrderCard";
import { CustomerOrderedCard } from "../components/CustomerOrderedCard";
import cartIcon from "../../../assets/svg/pageicon/cart.svg"
import { useState } from "react";
import { getAllOrderDetails } from "../../../services/order_detailService";
import { useMemo } from "react";
import { OrderPanelFooter } from "./OrderPanelFooter";


export const CustomerOrderPanel = ({ cart, setCart, openPanel, setOpenPanel,  handleOrder, orderId }) => {
    const [newOrder,setNewOrder] = useState(true)
    const [orderedCart, setOrderedCart] = useState([])


    const handleOrdered = async () =>{
        try {
            const response = await getAllOrderDetails(orderId)
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
        openPanel ?
            (<div className="h-[800px] bg-black rounded-3xl flex flex-col overflow-hidden border-2 border-gray-300">

                <div className="flex-1 flex flex-col gap-5 overflow-hidden">

                    <div className="h-[70px] p-5 text-2xl text-white grid grid-cols-2 ">
                        <div
                        onClick={()=>setNewOrder(true)}
                         className={`text-center py-4 cursor-pointer ${newOrder ? "text-yellow-300" :""}`}>New Order</div>
                        <div 
                        onClick={()=> {setNewOrder(false); handleOrdered();}}
                        className={`text-center py-4 cursor-pointer ${newOrder ? "" :"text-yellow-300"}`}>Ordered</div>
                    </div>

                    <hr className="text-white/70 "/>

                    <div className="grid grid-cols-[5fr_2fr_3fr] gap-5 text-gray-500 px-10 font-bold text-xl ">
                        <h1 className="  ">Name</h1>
                        <h1 className="  text-center">Price</h1>
                        <h1 className="  text-center">Quantity</h1>
                    </div>

                    {newOrder && <div className="flex-1 flex flex-col overflow-y-auto px-4 ">
                        {cart.map(order => (
                            <CustomerOrderCard order={order} cart={cart} setCart={setCart} />
                        ))}
                    </div>}

                    {!newOrder &&<div className="flex-1 flex flex-col overflow-y-auto px-4">
                        {orderedCart.map(order => (
                            <CustomerOrderedCard order={order} />
                        ))}
                    </div>}

                    
                </div>

                {newOrder && <OrderPanelFooter openPanel={openPanel} setOpenPanel={setOpenPanel} handle={handleOrder} 
                cart={cart} price={totalPrice} butTitle={"Place Order"} color={"bg-green-500"} style={""} rounded={""}/>}

                {!newOrder && <OrderPanelFooter openPanel={openPanel} setOpenPanel={setOpenPanel} handle={""} 
                cart={orderedCart} price={totalPriceOrdered} butTitle={"Payment"} color={"bg-blue-500"} style={""} rounded={""}/>}

                
            </div>) :

            (<OrderPanelFooter openPanel={openPanel} setOpenPanel={setOpenPanel} handle={handleOrder} 
                cart={cart} price={totalPrice} butTitle={"Place Order"} color={"bg-green-500"} 
                style={"bg-black/80 rounded-2xl shadow-md shadow-white/50 hover:scale-105 active:scale-95"} 
                rounded={"rounded-r-2xl"}/>)
    )
}