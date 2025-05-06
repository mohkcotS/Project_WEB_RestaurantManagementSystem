import { MdAccessTime } from "react-icons/md";
import { DateAndTimeUtils } from "../../../utils/DateAndTimeUtils";
import { useEffect, useState } from "react";
import { getFullAllOrderDetail } from "../../../services/order_detailService";
export const ChefOrderCard = ({ setOpenOrderDetail, order, setSelectedOrder}) => {
    const { date, time } = DateAndTimeUtils(order.updatedAt)
    const [dishes, setDishes] = useState([])
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await getFullAllOrderDetail(order.id)
                setDishes(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrderDetail()
    }, [order])

    const countPreparing = dishes.filter(dish => dish.status === "preparing").length;

    return (
        <div
            className="h-[400px] p-4 text-white bg-white/10 rounded-2xl shadow-lg shadow-white/50 backdrop-blur-md 
            border-2 border-white/30 hover:shadow-white hover:cursor-pointer">
            <div className="h-[300px] ">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-2xl font-bold text-yellow-500">Order# {order.id}</h1>
                        <h1 className="text-lg "> {countPreparing} new item(s)</h1>
                    </div>
                    <div className="flex text-gray-400 text-lg mb-2 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MdAccessTime className="text-xl" />
                            <h1> {date}</h1>
                        </div>
                        <h1>{time}</h1>

                    </div>

                </div>

                {dishes.filter(dish => dish.status === "preparing").slice(0, 3).map(dish => (
                    <div className="flex justify-between py-3 border-b-2 border-gray-400/40 items-center font-bold" key={dish.id}>
                        <h1 className="text-md ">{dish.Dish.name}</h1>
                        <h1 className="text-xl text-yellow-400">{dish.quantity}x</h1>
                    </div>
                ))}


                {countPreparing > 3 && <div className="flex justify-between py-4">
                    <h1 className="text-md">See more ...</h1>
                </div>}
            </div>

            <div className="w-full h-[50px] flex flex-col gap-5 justify-center">
                <button
                    onClick={() => { setOpenOrderDetail(true), setSelectedOrder(order) }}
                    className="px-10 py-2 rounded-xl text-lg hover:cursor-pointer bg-blue-500 transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">
                    See Detail
                </button>
            </div>

        </div>
    )
}