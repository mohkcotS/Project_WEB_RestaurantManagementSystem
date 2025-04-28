import { useState } from "react";
import useCheckRole from "../../../Hooks/useCheckRole.js";
import { useOutletContext } from "react-router-dom"
import RevenueChart from "../components/RevenueChart.jsx";
import { BestSellingTable } from "../components/BestSellingTable.jsx";
import { UserWidget } from "../components/UserWidget.jsx";
import { TableWidget } from "../components/TableWidget.jsx";
import { OrderTodayWidget } from "../components/OrderTodayWidget.jsx";
import { SaleTodayWidget } from "../components/SaleTodayWidget.jsx";
import { MonthlyRevenueWidget } from "../components/MonthlyRevenueWidget.jsx";

export const ManagerHome = () => {
    
    const { currentUser } = useOutletContext()
    const [selectedMonth,setSelectedMonth] = useState (new Date())
    useCheckRole(currentUser)
    
    return (

        <div className="w-[90%] h-auto mx-auto flex flex-col  my-10 gap-10">
            <div className="w-full flex gap-10">
                <div className="w-[70%] flex flex-col gap-10">
                    <div className="w-ful grid grid-cols-[4fr_6fr] gap-x-10">
                        <MonthlyRevenueWidget setSelectedMonth={setSelectedMonth}/>

                        <div className="w-full grid grid-cols-2 gap-x-10">
                            <SaleTodayWidget/>
                            <OrderTodayWidget/>
                        </div>
                    </div>

                    <div className="w-ful grid grid-cols-[4fr_6fr] gap-x-10">
                        <TableWidget/>
                        <UserWidget/>
                    </div>
                </div>
                <BestSellingTable/>
            </div>

            <div className="w-full flex-1 border-2 border-white rounded-3xl bg-black/30 ">
                <RevenueChart selectedMonth={selectedMonth}/>
            </div>

        </div>
    )
}