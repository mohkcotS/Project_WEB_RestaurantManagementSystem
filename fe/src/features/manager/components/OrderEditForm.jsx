import { useEffect, useState } from "react";
import { updateOrderStatus } from "../../../services/orderService";

export const OrderEditForm = ({ selectedOrder , setOpenEdit, setNotification , updateOrderList }) => {
    const [order, setOrder] = useState({});

    useEffect(() => {
        setOrder(selectedOrder)
    }, [selectedOrder]);

    const handleSubmit = async (e)   => {
        e.preventDefault();
        try {
            const response = await updateOrderStatus(selectedOrder.id,order.status)
            updateOrderList();
            setOpenEdit(false)
            setNotification({ message: response.data.message, status: "success" })
        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })
        }
    }

    return (
        <div className='w-[450px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-2xl font-bold'>
                <h2 className='text-blue-500'>Edit Order Information</h2>
                <button onClick={()=> setOpenEdit(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 '>
                <select 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    value={order.status}
                    onChange={(e) => setOrder({ ...order, status: e.target.value })}>

                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>

                </select>

                <button 
                    className='mx-auto w-[50%] bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 
                    hover:w-[70%] transition-all duration-700 cursor-pointer'>
                    Submit
                </button>
            </form>
        </div>
    );
};
