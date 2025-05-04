import { useEffect, useState } from "react"
import { getAllOrderDetails } from "../services/order_detailService"
import { DateAndTimeUtils } from "../utils/DateAndTimeUtils";
import { getTableById } from "../services/tableService";
import { getRewardByUserId } from "../services/rewardService";
import { CompletedOrderForm } from "../features/customer/components/CompletedOrderForm";

export const OrderDetailCard = ({ setOpenSeeDetail, selectedOrder, isPayment }) => {
    const [orderCart, setOrderCart] = useState([])
    const { date, time } = DateAndTimeUtils(selectedOrder.createdAt);
    const [table, setTable] = useState({});
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [tier, setTier] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllOrderDetails(selectedOrder.id)
                setOrderCart(response.data)
                const response1 = await getTableById(selectedOrder.TableId)
                setTable(response1.data)
                const response2 = await getRewardByUserId(selectedOrder.UserId)
                setTier(response2.data.tier)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const subTotal = orderCart.reduce((sum, item) => sum + item.totalPrice, 0);
    const loyaltyPoints = Math.floor((Number(subTotal) / 20) * 100) / 100;
    const discount = () => {
        let rate = 0;
    
        if (tier === "Bronze") rate = 0.03;
        else if (tier === "Silver") rate = 0.05;
        else if (tier === "Gold") rate = 0.07;
        else if (tier === "Platinium") rate = 0.09;
        else rate = 0.12;
    
        return Math.floor(subTotal * rate * 100) / 100;
    };
    
    const total = subTotal - discount()
    const formattedAmount = Number(total).toFixed(2); 
    const accountName = "Le Minh Duy";
    const addInfo = `Pay for Order ID: ${selectedOrder?.id ?? "unknown"}`;

    const qrURL = `https://img.vietqr.io/image/970436-1033187836-compact.png?amount=${formattedAmount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
    

    return (
        
        <div className="w-[450px] relative rounded-3xl border-3 bg-white p-6 overflow-y-auto max-h-[80vh]" >

            <h1 className="text-xl font-bold text-center mt-4">La Ratatouille Restaurant</h1>
            <hr className="border-1 border-dashed border-gray-700 my-4" />

            <div className="grid grid-cols-2 gap-x-20 text-lg ">
                <h1> <strong>Date:</strong> {date} </h1>
                <h1> <strong>Time:</strong> {time} </h1>
                <h1> <strong>Order ID:</strong> {selectedOrder.id}</h1>
                <h1> <strong>Table:</strong> {table.name} </h1>
            </div>

            <hr className="border-1 border-dashed border-gray-700 my-4" />
  
                {orderCart.map(order => (
                    <div >
                        <h1 className="font-bold text-lg">{order.name}</h1>
                        <div className="flex justify-between">
                            <div className="flex gap-20">
                                <h1>{order.quantity}x</h1>
                                <h1>{order.price}</h1>
                            </div>
                            <h1>{order.totalPrice.toFixed(2)}</h1>
                        </div>
                    </div>
                ))}
            
            <hr className="border-1 border-dashed border-gray-700 my-4" />

            <div className="flex justify-between">
                <div className="flex flex-col gap-2 ">
                    <h1 className="text-lg"> {orderCart.length} items</h1>
                    <div className="flex gap-2 justify-between">
                        <h1 className="font-bold "> Loyalty points  </h1>
                        <h1 className="text-blue-600">{loyaltyPoints}</h1>
                    </div>
                </div>              
                
                <div className="w-[180px] text-lg flex flex-col ">
                    <div className="flex gap-2 justify-between">
                        <h1 className="font-bold"> Sub total  </h1>
                        <h1>{subTotal.toFixed(2)}</h1>
                    </div>
                    <div className="flex gap-2 justify-between">
                        <h1 className="font-bold "> Discount  </h1>
                        <h1 className="text-red-600">{discount()}</h1>
                    </div>

                    <div className="flex gap-2 text-xl justify-between font-bold mt-2 mb-6">
                        <h1 className=" "> TOTAL  </h1>
                        <h1 className="text-green-700">{formattedAmount}</h1>
                    </div>        
                </div>

            </div>

            <div className="absolute top-5 right-5 text-xl font-bold">
                <button onClick={() => setOpenSeeDetail(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>

            {isPayment && <img
                src={qrURL}
                alt="Payment QR Code"
                className="w-60 mx-auto" />}

            {isPayment && <div className="w-full mt-4 flex justify-center ">
                <button 
                onClick={()=> {setOpenConfirmation(true)}}
                className="w-[80%] py-2 bg-green-600 rounded-xl text-lg hover:cursor-pointer  
                transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">Confirmation</button>
            </div>  }  

            {openConfirmation && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <CompletedOrderForm   setOpenConfirmation={setOpenConfirmation}         /></div>}

        </div>
    )
}