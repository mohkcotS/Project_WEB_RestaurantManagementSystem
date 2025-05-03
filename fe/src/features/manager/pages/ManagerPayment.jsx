import useCheckRole from "../../../Hooks/useCheckRole.js";
import { useOutletContext } from "react-router-dom"
import { getAllPayments } from "../../../services/paymentService.jsx";
import { CustomCalendar } from "../../../components/CustomCalendar.jsx";
import { DateAndTimeUtils } from "../../../utils/DateAndTimeUtils.js";
import { useEffect, useState } from "react";
import { ManagerPaymentCard } from "../components/ManagerPaymentCard.jsx";
import { PaymentEditForm } from "../components/PaymentEditForm.jsx";


export const ManagerPayment = () => {
    const { setNotification, currentUser } = useOutletContext()
    useCheckRole(currentUser)
    const [payments, setPayments] = useState([])
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [selectedDate, setSelectedDate] = useState()
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState({})

    const updatePaymentList = async () => {
        const response = await getAllPayments();
        setPayments(response.data);
    };

    useEffect(() => {
        updatePaymentList();
    }, []);

    useEffect(() => {
        if (selectedDate === undefined) {
            setFilteredPayments(payments);
            return;
        }
    
        const selectedDateString = DateAndTimeUtils(selectedDate).date
        console.log(selectedDateString)
    
        const filtered = payments.filter(payment => {
            const paymentDateString = DateAndTimeUtils(payment.createdAt).date
            return paymentDateString === selectedDateString;
        });
    
        setFilteredPayments(filtered);
    }, [selectedDate, payments]);

    return(
        <div className="w-[85%] mx-auto flex flex-col my-10 gap-5">
                    <div className="w-[55%]">
                        <CustomCalendar setSelectedDate={setSelectedDate} />
                    </div>  
        
                    <div className="w-full grid grid-cols-7 text-2xl font-bold text-yellow-300 px-10 text-center">
                        <div>PAYMENT ID</div>
                        <div>ORDER ID</div>
                        <div>DATE</div>
                        <div>TOTAL PRICE</div>
                        <div>METHOD</div>
                        <div>STATUS</div>
                        <div>ACTION</div>
                    </div>
                    <hr className="text-white/70" />
                    <div className="w-full overflow-y-auto max-h-[630px] overflow-x-visible px-10" >
                        {filteredPayments && filteredPayments.length > 0 ? (
                            filteredPayments.map(payment => (
                                <ManagerPaymentCard payment={payment} setSelectedPayment={setSelectedPayment} setOpenEdit={setOpenEdit} />
                            ))
                        ) : (
                            <div className="text-white text-2xl font-bold text-center mt-10">
                                No payments found
                            </div>
                        )}
                    </div>
        
        
                    {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20">
                        <PaymentEditForm selectedPayment={selectedPayment} setOpenEdit={setOpenEdit} setNotification={setNotification} updatePaymentList={updatePaymentList} /></div>}
                </div>
    )
}