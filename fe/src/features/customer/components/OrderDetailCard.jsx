import { useEffect, useState } from "react"
import { getAllOrderDetails } from "../../../services/order_detailService"
import { DateAndTimeUtils } from "../utils/DateAndTimeUtils";
import { getTableById } from "../../../services/tableService";

export const OrderDetailCard = ({ setOpenSeeDetail, selectedOrder, QRcode }) => {
    const [orderCart, setOrderCart] = useState([])
    const { date, time } = DateAndTimeUtils(selectedOrder.createdAt);
    const [table, setTable] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllOrderDetails(selectedOrder.id)
                setOrderCart(response.data)
                const response1 = await getTableById(selectedOrder.TableId)
                setTable(response1.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const totalAmount = orderCart.reduce((sum, item) => sum + item.totalPrice, 0);
    const formattedAmount = Number(totalAmount).toFixed(2); 
    const accountName = "Le Minh Duy";
    const addInfo = `Pay for Order ID: ${selectedOrder?.id ?? "unknown"}`;

    const qrURL = `https://img.vietqr.io/image/970436-1033187836-compact.png?amount=${formattedAmount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
    

    return (
        
        <div className="w-[450px] relative rounded-3xl border-3 bg-white p-6 overflow-y-auto max-h-[80vh]" >

            <h1 className="text-xl font-bold text-center mt-4">La Ratatouille Restaurant</h1>
            <hr className="border-1 border-dashed border-gray-700 my-4" />

            <div className="grid grid-cols-2 gap-x-10 text-lg ">
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
                <h1 className="text-lg"> {orderCart.length} items</h1>
                <div className="flex gap-10 text-2xl font-bold">
                    <h1> TOTAL:  </h1>
                    <h1>{formattedAmount}</h1>
                </div>

            </div>

            <div className="absolute top-5 right-5 text-xl font-bold">
                <button onClick={() => setOpenSeeDetail(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>

            {QRcode && <img
                src={qrURL}
                alt="Payment QR Code"
                className="w-60 mx-auto" />}

        </div>
    )
}