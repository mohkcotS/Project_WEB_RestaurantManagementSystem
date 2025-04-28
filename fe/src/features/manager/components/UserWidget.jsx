import { useEffect, useState } from "react";
import { getUserCounted } from "../../../services/userService.jsx";

export const UserWidget = () => {
    const [userCounted, setUserCounted] = useState([])
    const countCustomer = async () => {
            try {
                const response = await getUserCounted();
                setUserCounted(response.data);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        };
    useEffect(()=>{
        countCustomer();
    })
    return (
        <div className="border-2 h-44 border-white py-6 px-8 rounded-3xl text-center">
            <h3 className="text-xl font-semibold text-yellow-600">NO. OF USER</h3>
            <hr className="mb-6 mt-2 text-white" />
            <div className="w-full grid grid-cols-4 justify-center font-semibold place-items-center">
                <div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2">
                    <h2 className="font-semibold text-xl text-[#AEEEEE]">Customer</h2>
                    <h2 className="text-2xl text-white">{userCounted.customer}</h2>
                </div>
                <div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2 ">
                    <h2 className="font-semibold text-xl text-[#FFDAB9]">Manager</h2>
                    <h2 className="text-2xl text-white">{userCounted.manager}</h2>
                </div><div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2 ">
                    <h2 className="font-semibold text-xl text-[#D8BFD8]">Chef</h2>
                    <h2 className="text-2xl text-white">{userCounted.chef}</h2>
                </div><div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2">
                    <h2 className="font-semibold text-xl text-[#B5EAD7]">Cashier</h2>
                    <h2 className="text-2xl text-white">{userCounted.cashier}</h2>
                </div>

            </div>

        </div>
    )
}