import { useOutletContext } from "react-router-dom"
import { ManagerOrderCard } from "../components/ManagerOrderCard.jsx";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../../services/orderService.jsx";
import { OrderDetailCard } from "../../../components/OrderDetailCard.jsx";
import { OrderEditForm } from "../components/OrderEditForm.jsx";
import { CustomCalendar } from "../../../components/CustomCalendar.jsx";
import { DateAndTimeUtils } from "../../../utils/DateAndTimeUtils.js";

export const ManagerOrder = () => {
    const { setNotification} = useOutletContext()
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState()
    const [openSeeDetail, setOpenSeeDetail] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})

    const updateOrderList = async () => {
        const response = await getAllOrders();
        setOrders(response.data);
    };

    useEffect(() => {
        updateOrderList();
    }, []);

    useEffect(() => {
        if (selectedDate === undefined) {
            setFilteredOrders(orders);
            return;
        }
    
        const selectedDateString = DateAndTimeUtils(selectedDate).date
        console.log(selectedDateString)
    
        const filtered = orders.filter(order => {
            const orderDateString = DateAndTimeUtils(order.createdAt).date
            return orderDateString === selectedDateString;
        });
    
        setFilteredOrders(filtered);
    }, [selectedDate, orders]);
    
    

    return (
        <div className="w-[80%] mx-auto flex flex-col my-10 gap-5">
            <div className="w-[55%]">
                <CustomCalendar setSelectedDate={setSelectedDate} />

            </div>  

            <div className="w-full grid grid-cols-[2fr_3fr_3fr_3fr_3fr] text-lg font-bold text-yellow-300 px-10 text-center">
                <div>ORDER ID</div>
                <div >DATE</div>
                <div>TOTAL PRICE</div>
                <div>STATUS</div>
                <div>ACTION</div>
            </div>
            <hr className="text-white/70" />
            <div className="w-full overflow-y-auto max-h-[480px] overflow-x-visible space-y-3 px-10" >
                {filteredOrders && filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <ManagerOrderCard order={order} setOpenSeeDetail={setOpenSeeDetail} setSelectedOrder={setSelectedOrder} setOpenEdit={setOpenEdit} />
                    ))
                ) : (
                    <div className="text-white text-2xl font-bold text-center mt-10">
                        No orders found
                    </div>
                )}
            </div>

            {openSeeDetail && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20">
                <OrderDetailCard setOpenSeeDetail={setOpenSeeDetail} selectedOrder={selectedOrder} isPayment={false} /></div>}

            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20">
                <OrderEditForm selectedOrder={selectedOrder} setOpenEdit={setOpenEdit} setNotification={setNotification} updateOrderList={updateOrderList} /></div>}
        </div>
    )
}