export const CustomerOrderedCard = ({order }) => {
    
    return (
        <div className="w-full h-[70px] grid grid-cols-[5fr_2fr_3fr] py-3 px-6 gap-5 text-white items-center justify-center border-b-1 border-gray-500/80">
            
            <h1 className=" text-xl w-56 truncate" title={order.name}>{order.name}</h1>
            
            <h1 className="  text-lg text-center ">${order.price}</h1>
             
            <h1 className=" text-xl text-center">{order.quantity}</h1> 
            
        </div>
    )
}