import { useEffect, useState } from "react";
import { getTodayOrders } from "../../../services/orderService.jsx";

export const OrderTodayWidget = () => {
    const [todayOrder, setTodayOrder] = useState(0);
    const fetchOrderToday = async () => {
        try {
            const response = await getTodayOrders()
            setTodayOrder(response.data.count)
        } catch (error) {
            console.error("Error fetching", error);
        }
    }
    useEffect(() => {
        fetchOrderToday();
    }, []);
    return (
        <div className="border-2 h-40 border-white py-6 px-8 rounded-3xl text-center">
            <h3 className="text-xl font-semibold text-yellow-600">ORDERS TODAY</h3>
            <hr className="mb-6 mt-2 text-white" />
            <h1 className="font-bold text-2xl text-white"> {todayOrder} </h1>
        </div>
    )
}