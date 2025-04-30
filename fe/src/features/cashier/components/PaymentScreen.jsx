import { useState, useEffect } from "react"
import { getOrderByTableId, updateOrderStatus } from "../../../services/orderService"
import { DateAndTimeUtils } from "../../../utils/DateAndTimeUtils"
import { getAllOrderDetails } from "../../../services/order_detailService"
import { getRewardByUserId, updateLoyaltyPointByUserId } from "../../../services/rewardService"
import { createPayment } from "../../../services/paymentService"
import { updateTableStatus } from "../../../services/tableService"

export const PaymentScreen = ({ selectedTable, setOpenPayment, setNotification, updateTableList }) => {
    const [order, setOrder] = useState({})
    const { date, time } = DateAndTimeUtils(order.createdAt)
    const [cart, setCart] = useState([])
    const [tier, setTier] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrderByTableId(selectedTable.id)
                setOrder(response.data)
                const response1 = await getAllOrderDetails(response.data.id)
                setCart(response1.data)
                const response2 = await getRewardByUserId(response.data.UserId)
                setTier(response2.data.tier)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const subTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
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

    const handleConfirmation = async () => {
        if(!paymentMethod){
            setNotification({message: "Please choose payment method ", status: "error"})
            return
        }
        const payment = {
            amount: total, 
            method: paymentMethod, 
            date: new Date(order.createdAt).toISOString().split('T')[0], 
            OrderId: order.id
          }; 

        try {
            const response = await createPayment(payment)
            setNotification({message:response.data.message , status: "success"})
            await updateLoyaltyPointByUserId(order.UserId,{ newPoints: loyaltyPoints })
            await updateTableStatus(order.TableId,  "available")
            await updateOrderStatus(order.id, "completed")
            setOpenPayment(false)
            updateTableList()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative w-[800px] h-[500px] rounded-3xl  bg-gray-100 '>
            <div className='absolute top-5 right-5 text-2xl font-bold'>
                <button
                    onClick={() => { setOpenPayment(false) }}
                    className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <div className="flex w-full h-full gap-5">
                <div className="w-[450px] h-full  px-6 py-6 overflow-y-auto scrollbar-hide max-h-[95%]" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <h1 className="text-xl font-bold text-center">La Ratatouille Restaurant</h1>
                    <hr className="border-1 border-dashed border-gray-700 my-4" />

                    <div className="grid grid-cols-2 gap-x-10 text-lg ">
                        <h1> <strong>Date:</strong> {date} </h1>
                        <h1> <strong>Time:</strong> {time} </h1>
                        <h1> <strong>Order ID:</strong> {order.id}</h1>
                        <h1> <strong>Table:</strong> {selectedTable.name} </h1>
                    </div>

                    <hr className="border-1 border-dashed border-gray-700 my-4" />

                    {cart.map(dish => (
                        <div >
                            <h1 className="font-bold text-lg">{dish.name}</h1>
                            <div className="flex justify-between">
                                <div className="flex gap-20">
                                    <h1>{dish.quantity}x</h1>
                                    <h1>{dish.price}</h1>
                                </div>
                                <h1>{dish.totalPrice.toFixed(2)}</h1>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="w-[350px] border-l-1 pt-10 px-6 space-y-8">

                    <div className="space-y-2 mt-6">
                        <div className="flex justify-between">
                            <h1 className="text-lg font-bold">Sub total</h1>
                            <h1 className="text-lg">{subTotal.toFixed(2)}</h1>
                        </div>

                        <div className="flex justify-between">
                            <h1 className="text-lg font-bold">Membership discount</h1>
                            <h1 className="text-lg text-red-500">{discount()}</h1>
                        </div>

                        <hr className="border-gray-400 my-2" />

                        <div className="flex justify-between">
                            <h1 className="text-2xl font-bold">TOTAL</h1>
                            <h1 className="text-2xl font-bold text-green-600">{total.toFixed(2)}</h1>
                        </div>

                        <div className="flex justify-between">
                            <h1 className="text-lg font-bold">Loyalty points</h1>
                            <h1 className="text-lg text-blue-700">{loyaltyPoints.toFixed(2)}</h1>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-lg font-bold mb-1">Payment Method</h1>
                        <select 
                        onChange={(e)=>{setPaymentMethod(e.target.value)}}
                        className="w-full border border-gray-400 rounded-md p-2 text-sm">
                            <option value="">Choose method</option>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="ewallet">E-wallet</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <button className="rounded-xl cursor-pointer bg-yellow-500 hover:scale-105 active:scale-95 duration-300 text-white font-bold py-2">
                            Print Bill
                        </button>
                        <button 
                            onClick={handleConfirmation}
                            className="rounded-xl cursor-pointer bg-green-500 hover:scale-105 active:scale-95 duration-300 text-white font-bold py-2">
                            Confirmation
                        </button>
                    </div>

                </div>


            </div>

        </div>
    )
}