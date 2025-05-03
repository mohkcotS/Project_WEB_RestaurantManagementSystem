import { useNavigate } from "react-router-dom";
export const CompletedOrderForm = ({setOpenConfirmation}) => {
    const navigate = useNavigate();
    const handleComplete = () => {
        sessionStorage.clear()
        navigate("/"); 
        return null;
    }
    return(
        <div className='w-[450px] h-auto rounded-3xl  bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-2xl font-bold'>
                <h2 className='text-blue-500'>Order completion</h2>
                <button onClick={() => setOpenConfirmation(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>

            <div className="flex flex-col items-center gap-5">
                <h2 className="font-bold text-center text-xl">Have you confirmed all the order details??</h2>
                <div className="flex gap-20">
                    <button
                    onClick={handleComplete}
                     className="rounded-xl hover:cursor-pointer bg-green-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">Yes</button>
                    
                    <button
                    onClick={()=>{setOpenConfirmation(false)}}
                    className="rounded-xl hover:cursor-pointer bg-red-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">No</button>
                </div>
            </div>

        </div>
    )
}