export const CustomerOrderedCard = ({order }) => {
    
    return (
        <div className="w-full h-[50px] grid grid-cols-[5fr_2fr_3fr] gap-5 text-white items-center justify-center border-b-1 border-gray-500/80">
            
            <h1 className=" text-lg w-48 truncate" title={order.name}>{order.name}</h1>
            
            <h1 className="  text-md ">${order.price}</h1>
             
            <h1 className=" text-lg text-center">{order.quantity}</h1> 
            
        </div>
    )
}