import { createOrder } from "../../../services/orderService";
import { updateTableStatus } from "../../../services/tableService";
import { useNavigate } from "react-router-dom";


export const TableConfirmation = ({ selectedTable, setOpenEdit, setConfirmation, setNotification, updateTableList, selectedUser, setCurrentOrder }) => {
    const navigate = useNavigate();

    const data = {
        TableId: selectedTable.id,
        UserId: selectedUser
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateTableStatus(selectedTable.id, "occupied")
            const response1 = await createOrder(data)
            setCurrentOrder(response1.data); 
            sessionStorage.setItem("order", JSON.stringify(response1.data)); 
            sessionStorage.setItem("table", JSON.stringify(selectedTable)); 
            sessionStorage.setItem("confirmation", JSON.stringify(true)); 
            updateTableList();
            setOpenEdit(false)
            setNotification({ message: response.data.message, status: "success" })
            setConfirmation(true)
            navigate(`/customer/order`);
        } catch (error) {
            setNotification(error)
        }
    }


    return (
        <div className='w-[450px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-2xl font-bold'>
                <h2 className='text-blue-500'>Table confirmation</h2>
                <button onClick={() => setOpenEdit(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>

            <div className="flex flex-col items-center gap-5">
                <h2 className="font-bold text-center text-xl"> Do you want to choose table {selectedTable.name} </h2>
                <div className="flex gap-20">
                    <button onClick={handleSubmit} className="rounded-xl hover:cursor-pointer bg-green-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">Submit</button>
                </div>
            </div>

        </div>
    )
}