import { useNavigate } from "react-router-dom";

export const Logout = ({setOpenLogout}) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        sessionStorage.clear();
        sessionStorage.setItem("message", JSON.stringify({message: "Logout Successfully" ,status: "success"}));
        navigate("/"); 
        return null;
    }
    
    return (
        <div className='w-[400px] h-auto rounded-3xl bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-xl font-bold'>
                <h2 className='text-blue-500'>Log Out</h2>
                <button onClick={()=>setOpenLogout(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>

            <div className="flex flex-col items-center gap-5">
                <h2 className="font-bold text-center text-lg"> Do you want to log out? </h2>
                <div className="flex gap-20 text-sm">
                    <button onClick={()=>{setOpenLogout(false)}} className="rounded-xl hover:cursor-pointer bg-green-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">Cancel</button>
                    <button onClick= {handleLogout}className="rounded-xl hover:cursor-pointer bg-red-500  hover:scale-105 active:scale-95 duration-300 text-white font-bold px-8 py-2 ">Log Out</button>
                </div>
            </div>          
            
        </div>
    );
};
