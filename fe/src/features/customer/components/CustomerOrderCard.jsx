import { addToCart, decreaseFromCart } from "../utils/CartUtils"
export const CustomerOrderCard = ({order ,cart,setCart}) => {
    
    return (
        <div className="w-full h-[70px] grid grid-cols-[5fr_2fr_3fr] gap-5 px-6 text-white items-center justify-center border-b-1 border-gray-500/80">
            
            <h1 className=" text-xl w-56 truncate" title={order.dish.name}>{order.dish.name}</h1>
            
            <h1 className=" text-lg text-center">${order.dish.price}</h1>
             

            <div className=" flex gap-5 text-white justify-center">
                <button 
                onClick={()=>decreaseFromCart(cart,setCart,order.dish)}
                className="w-6 h-6 py-3 px-3 rounded-lg  border-2 flex justify-center items-center text-2xl hover:scale-105 active:scale-95 cursor-pointer">-</button>
                <h1 className="text-2xl font-bold">{order.quantity}</h1>
                <button
                onClick={()=>addToCart(cart,setCart,order.dish)}
                className="w-6 h-6 py-3 px-3 rounded-lg  border-2 flex justify-center items-center text-2xl hover:scale-105 active:scale-95 cursor-pointer">+</button>
            </div>

            
        </div>
    )
}