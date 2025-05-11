import {updateOrderDetailStatus } from "../../../services/order_detailService";
import socket from "../../../socket";

export const DishCompletedForm = ({setOpenDishCompleted, setNotification, selectedDish, fetchOrderDishes,id}) => {
    const handleCompleteDish = async () => {
        try {
            const response = await updateOrderDetailStatus(selectedDish)
            setNotification({message: response.data.message, status: "success"})
            fetchOrderDishes(id);
            setOpenDishCompleted(false)

        } catch (error) {
            setNotification(error)
        }
    }
    return (
        <div className='w-[450px] h-auto rounded-3xl bg-gray-100 p-6 space-y-6'>
            <div className='flex justify-between items-center text-2xl font-bold'>
                <h2 className='text-blue-500'>Dish Confirmation</h2>
                <button onClick={() => setOpenDishCompleted(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>

            <div className="flex flex-col items-center gap-5">
                <h2 className="font-bold text-center text-xl"> Is this dish completed and ready to serve? </h2>
                <div className="flex gap-20">
                    <button 
                    onClick={()=>{handleCompleteDish()}}
                    className="rounded-xl hover:cursor-pointer bg-green-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">Yes</button>
                
                <button onClick={() => setOpenDishCompleted(false)} className="rounded-xl hover:cursor-pointer bg-red-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">No</button>
                </div>

            </div>

        </div>
    )
}