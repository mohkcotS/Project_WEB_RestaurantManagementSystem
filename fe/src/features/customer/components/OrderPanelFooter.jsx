import cartIcon from "../../../assets/svg/pageicon/cart.svg"
export const OrderPanelFooter = ({openPanel,setOpenPanel,handle,cart,price,butTitle,color,style,rounded}) => {
    return (
        <div className={`h-[80px] w-full flex text-white justify-between items-center cursor-pointer ${style} `}>
            <div className="w-[60%] h-full flex gap-6 text-lg items-center px-10 cursor-pointer "
                onClick={() => { setOpenPanel(!openPanel) }}>
                <div className="relative w-12 h-12">
                    <img src={cartIcon} alt="Cart Icon" className="w-full h-full" />
                    <div className="absolute top-0 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {cart.length}
                    </div>
                </div>


                <span className="text-2xl text-yellow-300">${price.toFixed(2)}</span>

            </div>

            <div 
            onClick={() => handle(cart)}
            className={`flex-1 h-full flex justify-center items-center text-2xl font-bold transition-all 
            duration-300 hover:scale-105 active:scale-95 cursor-pointer ${color} ${rounded} `}>
            {butTitle}   
            </div>
        </div>
    )
}