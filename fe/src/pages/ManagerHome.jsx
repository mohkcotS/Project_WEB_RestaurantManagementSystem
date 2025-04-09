import { useEffect, useState } from "react";

import { getUserCounted } from "../services/userService.jsx";

export const ManagerHome = () => {
    const [userCounted,setUserCounted] = useState([])

    useEffect (()=> {
        const countCustomer = async () => {
            const response = await getUserCounted()
            setUserCounted(response.data);
        };
        countCustomer();

    },[])   


    const topFoods = [
        { name: "Gà rán", sold: 100 },
        { name: "Pizza", sold: 90 },
        { name: "Phở bò", sold: 85 },
        { name: "Bún chả", sold: 80 },
        { name: "Cơm tấm", sold: 75 },
        { name: "Bánh mì", sold: 70 },
        { name: "Sushi", sold: 65 },
        { name: "Bò bít tết", sold: 60 },
        { name: "Mì cay", sold: 55 },
        { name: "Trà sữa", sold: 50 }
    ];
    return (

        <div className="w-[80%] h-auto mx-auto flex  my-10 gap-20">

            <div className="w-[60%] flex flex-col gap-10 ">

                <div className="flex w-full gap-10  ">
                    <div className="w-[50%] h-[240px]  py-8 px-8 rounded-3xl hover:-translate-y-3 transition-all ease-out duration-500  
                                    border-2 border-white">

                        <h3 className="text-2xl font-semibold text-yellow-300">REVENUES</h3>
                        <hr className="mb-5 mt-2 text-white" />
                        <div className="flex gap-20 text-white items-center ">
                            <div className="grid grid-rows-3 gap-4 font-bold items-center">
                                <h1>DATE</h1>
                                <h1>WEEK</h1>
                                <h1>MONTH</h1>
                            </div>

                            <div className="grid grid-rows-3 gap-4 text-green-400 text-xl items-center">
                                <h1 className="font-semibold">100</h1>
                                <h1 className="font-semibold">200</h1>
                                <h1 className="font-semibold">300</h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-[50%] h-[240px]  py-8 px-8 rounded-3xl hover:-translate-y-3 transition-all ease-out duration-500  
                                    border-2 border-white">

                        <h3 className="text-2xl font-semibold text-yellow-300">TABLES</h3>
                        <hr className="mb-5 mt-2 text-white" />
                        <div className="flex gap-20 text-white ">
                            <div className="grid grid-rows-2 gap-4 font-bold">
                                <h1>AVAILABLE</h1>
                                <h1>SERVE</h1>
                            </div>

                            <div className="grid grid-rows-2 gap-4 text-xl">
                                <h1 className="text-green-400">3</h1>
                                <h1 className="text-red-400">7</h1>
                            </div>
                        </div>
                    </div>

                   

                </div>

                <div className="w-full h-auto py-6 px-8 border-2 rounded-3xl text-white hover:-translate-y-3 transition-all ease-out duration-500">
                    <h3 className="text-2xl font-bold text-center text-yellow-300">NO. OF USER</h3>
                    <hr className="mb-5 mt-2" />

                    <div className="flex justify-center gap-20 font-semibold">
                        <div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2 py-2 ">
                            <h2 className="font-semibold text-xl text-[#AEEEEE]">Customer</h2>
                            <h2 className="text-2xl">{userCounted.customer}</h2>
                        </div>
                        <div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2 py-2 ">
                            <h2 className="font-semibold text-xl text-[#FFDAB9]">Manager</h2>
                            <h2 className="text-2xl">{userCounted.manager}</h2>
                        </div><div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2 py-2 ">
                            <h2 className="font-semibold text-xl text-[#D8BFD8]">Chef</h2>
                            <h2 className="text-2xl">{userCounted.chef}</h2>
                        </div><div className="w-[100px] h-[100px] text-xl rounded-3xl flex flex-col items-center gap-2 py-2 ">
                            <h2 className="font-semibold text-xl text-[#B5EAD7]">Cashier</h2>
                            <h2 className="text-2xl">{userCounted.cashier}</h2>
                        </div>

                    </div>
                </div>

            </div>

            <div className="flex flex-col justify-center items-center w-[40%] border-2 border-gray-200 rounded-3xl 
                px-10 py-10 text-white">

                <h1 className="text-center text-3xl font-bold mb-4">Best-selling Dishes Today</h1>
                <hr className="w-full border-white" />

                <div className="w-full flex flex-col py-4 text-lg font-semibold gap-4">

                    <div className="grid grid-cols-3 w-full py-2 px-6 text-white">
                        <h2 className="text-left">No.</h2>
                        <h2 className="text-left">Name</h2>
                        <h2 className="text-right">Quantity</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {topFoods.map((food, index) => (
                            <div key={index} className="grid grid-cols-3 w-full items-center bg-[#f5f5dc]/20 px-8
                                            rounded-3xl shadow-md shadow-white/50 p-3 hover:scale-105 transition-all duration-300">
                                <h1 className="text-left">{index + 1}</h1>
                                <h1 className="text-left">{food.name}</h1>
                                <h1 className="text-right">{food.sold}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}