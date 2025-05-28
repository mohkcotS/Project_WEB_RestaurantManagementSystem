import { addToCart, decreaseFromCart } from "../utils/CartUtils";

export const CustomerDishCard = ({ dish, cart , setCart }) => {
    const order = cart.find((item) => item.dish.id === dish.id);
    
    return (
        
        <div className="relative hover:scale-105 hover:shadow-white transition-all duration-500 text-white flex gap-2 bg-white/10 rounded-3xl shadow-md shadow-white/50 ">
            <div className="w-[40%] ">
                <img src={dish.imageUrl} alt="" className="w-full aspect-square object-fill rounded-3xl" />
            </div>

            <div className="flex-1 flex flex-col px-5 ">
                <div className="w-full py-4">
                    <h1 className=" text-md mb-2 font-bold text-green-500">{dish.name}</h1>
                    <h1 className="text-sm font-bold">${dish.price}</h1>
                </div>

                {order ? (
                    <div className="flex items-center  gap-5 text-white">
                        <button
                            onClick={() => decreaseFromCart(cart,setCart,dish)}
                            className="w-4 h-3 py-3 px-3 rounded-lg border-2 flex justify-center items-center text-md hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            -
                        </button>
                        <h1 className="text-md font-bold">{order.quantity}</h1>
                        <button
                            onClick={() => addToCart(cart,setCart,dish)}
                            className="w-4 h-3 py-3 px-3 rounded-lg border-2 flex justify-center items-center text-md hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => addToCart(cart,setCart,dish)}
                        className="w-4 h-3 py-3 px-3 rounded-lg border-2 flex justify-center items-center text-md hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        +
                    </button>
                )}

                

            </div>
            {dish.status === "sold out" &&<div className="absolute inset-0 bg-black/80 z-1 rounded-3xl flex justify-center items-center text-3xl font-bold">
                SOLD OUT
            </div>}
        </div>
    )
}