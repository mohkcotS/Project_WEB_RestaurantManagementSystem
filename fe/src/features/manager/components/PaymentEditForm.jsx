import { useEffect, useState } from "react";
import { updatePaymentStatus } from "../../../services/paymentService";

export const PaymentEditForm = ({ selectedPayment, setOpenEdit, setNotification, updatePaymentList }) => {
    const [payment, setPayment] = useState({});
    const [note, setNote] = useState("")

    useEffect(() => {
        setPayment(selectedPayment)
    }, [selectedPayment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!note) {
            setNotification({ message: "Please leave a note", status: "error" })
            return
        }
        const data = {
            status: payment.status,
            note: note
        }
        try {
            const response = await updatePaymentStatus(payment.id , data)
            updatePaymentList();
            setOpenEdit(false)
            setNotification({ message: response.data.message, status: "success" })
        } catch (error) {
            setNotification(error)
        }
    }

    return (
        <div className='w-[450px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-2xl font-bold'>
                <h2 className='text-blue-500'>Edit Payment Information</h2>
                <button onClick={() => setOpenEdit(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 '>
                <select
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400'
                    value={payment.status}
                    onChange={(e) => setPayment({ ...payment, status: e.target.value })}>

                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>

                </select>

                <textarea
                    placeholder="Note"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />



                <button
                    className='mx-auto w-[50%] bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 
                    hover:w-[70%] transition-all duration-700 cursor-pointer'>
                    Change
                </button>
            </form>
        </div>
    );
};
