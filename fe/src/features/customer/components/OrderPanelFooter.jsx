import cartIcon from "../../../assets/svg/pageicon/cart.svg"
import socket from "../../../socket"
export const OrderPanelFooter = ({openPanel,setOpenPanel,order,cart,price,butTitle,color,style,rounded, setOpenSeeDetail, setNewOrder, setOrderConfirmation, currentOrder}) => {
    const handleClick = () => {
        if (order === 1) {
            setOrderConfirmation(true)
        } else {
            setOpenSeeDetail(true);
            socket.emit("checkout", {TableId: currentOrder.TableId})
        }
        
    }
    
    return (
        <div className={`h-[70px] w-full flex text-white justify-between items-center cursor-pointer ${style} `}>
            <div className="w-[60%] h-full flex gap-6 text-lg items-center px-10 cursor-pointer "
                onClick={() => { setOpenPanel(!openPanel); setNewOrder(true) }}>
                <div className="relative w-8 h-8">
                    <img src={cartIcon} alt="Cart Icon" className="w-full h-full" />
                    <div className="absolute top-0 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {cart.length}
                    </div>
                </div>


                <span className="text-xl text-yellow-300">${price.toFixed(2)}</span>

            </div>

            <div 
            onClick={handleClick}
            className={`flex-1 h-full flex justify-center items-center text-lg font-bold transition-transform 
            duration-300 hover:scale-105 active:scale-95 cursor-pointer ${color} ${rounded} `}>
            {butTitle}   
            </div>
        </div>
    )
}