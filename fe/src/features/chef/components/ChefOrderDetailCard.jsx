import { FaCheck } from "react-icons/fa";
import { DateAndTimeUtils } from "../../../utils/DateAndTimeUtils";
import { DishCompletedForm } from "../components/DishCompletedForm";
import { OrderCompletedForm } from "./OrderCompletedForm";
import { useState } from "react";

export const ChefOrderDetailCard = ({ setOpenOrderDetail, order, setNotification, dishes, fetchOrderDishes, load}) => {
    const { date, time } = DateAndTimeUtils(order.updatedAt)
    const [openDishCompleted,setOpenDishCompleted] = useState(false)
    const [openOrderCompleted,setOpenOrderCompleted] = useState(false)
    const [selectedDish,setSelectedDish] = useState(0)
    
    const sortedDishes = dishes.sort((a, b) => {
        if (a.status === "completed" && b.status !== "completed") return 1; 
        if (a.status !== "completed" && b.status === "completed") return -1; 
        return 0; 
    });

    const preparingdDishesCount = dishes.filter(dish => dish.status === "preparing").length;

    return (
        <div className="w-[550px] relative rounded-3xl border-3 bg-gray-100 p-6 overflow-y-auto max-h-[80vh]" >
            <h1 className="text-2xl font-bold text-center my-4">Order# {order.id}</h1>
            <div className="flex justify-between">
                <h1> <strong>Date: </strong>{date}</h1>
                <h1> <strong>Time: </strong>{time}</h1>
            </div>
            <hr className="border-1  border-gray-700 my-4" />

            {sortedDishes.map(dish => (
                <div  className="grid grid-cols-[3fr_1fr_1fr] mb-3">
                    <div className={`text-lg ${dish.status === "completed" ? "text-gray-400" : ""}`}>
                        <h1 >{dish.Dish.name}</h1>
                        <h1 >{dish.quantity}x</h1>
                    </div>

                    <h1 className={`text-center ${dish.status === "completed" ? "text-green-600" : "text-orange-500"}  text-xl font-semibold`}>{dish.status}</h1>

                    {dish.status === "preparing" && <div className="w-full h-full flex justify-end ">
                        <button
                            onClick={() => {setOpenDishCompleted(true); setSelectedDish(dish.id)}}
                            className=" h-[70%] border-black px-3 rounded-xl text-md hover:cursor-pointer bg-blue-500 transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">
                            <FaCheck />
                        </button>
                    </div>}
                </div>
            ))}



            <hr className="border-1 border-dashed border-gray-700 my-4" />
            <div className="flex justify-between">
                <h1>{dishes.length} items</h1>
                <div className="flex justify-center ">
                    <button
                        onClick={()=>{setOpenOrderCompleted(true)}}
                        disabled={preparingdDishesCount >0}
                        className="border-black px-6 py-2 rounded-xl text-lg hover:cursor-pointer bg-green-600 transition-all 
                        duration-500 hover:scale-105 active:scale-95 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                        Order Complete
                    </button>
                </div>
            </div>



            <div className="absolute top-5 right-5 text-xl font-bold">
                <button onClick={() => setOpenOrderDetail(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            

            {openDishCompleted && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <DishCompletedForm setOpenDishCompleted={setOpenDishCompleted} setNotification={setNotification} 
            selectedDish={selectedDish} fetchOrderDishes={fetchOrderDishes}  id={order.id}/></div>}   

            {openOrderCompleted && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <OrderCompletedForm setOpenOrderCompleted={setOpenOrderCompleted} setNotification={setNotification} 
            setOpenOrderDetail={setOpenOrderDetail} load={load} /></div>}   

        </div>

    )
}