import { addToCart, decreaseFromCart } from "../utils/CartUtils";

export const CustomerDishCard = ({ dish, cart , setCart }) => {
    const order = cart.find((item) => item.dish.id === dish.id);
    
    return (
        
        <div className="hover:scale-105 hover:shadow-white transition-all duration-500 text-white flex gap-2 bg-white/10 rounded-3xl shadow-md shadow-white/50 ">
            <div className="w-[40%] ">
                <img src={dish.imageUrl} alt="" className="w-full aspect-square object-fill rounded-xl" />
            </div>

            <div className="flex-1 flex flex-col px-5">
                <div className="w-full py-4">
                    <h1 className=" text-xl mb-2 font-bold text-green-500">{dish.name}</h1>
                    <h1 className="text-lg font-bold">${dish.price}</h1>
                </div>

                {order ? (
                    <div className="flex items-center  gap-5 text-white">
                        <button
                            onClick={() => decreaseFromCart(cart,setCart,dish)}
                            className="w-8 h-8 py-4 px-4 rounded-xl border-2 flex justify-center items-center text-2xl hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            -
                        </button>
                        <h1 className="text-2xl font-bold">{order.quantity}</h1>
                        <button
                            onClick={() => addToCart(cart,setCart,dish)}
                            className="w-8 h-8 py-4 px-4 rounded-xl border-2 flex justify-center items-center text-2xl hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => addToCart(cart,setCart,dish)}
                        className="w-8 h-8 py-4 px-4 rounded-xl border-2 flex justify-center items-center text-2xl hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        +
                    </button>
                )}





            </div>
        </div>
    )
}