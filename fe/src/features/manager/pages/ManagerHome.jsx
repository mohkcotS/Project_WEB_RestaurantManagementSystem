import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { RevenueChart } from "../components/RevenueChart.jsx";
import { BestSellingTable } from "../components/BestSellingTable.jsx";
import { UserWidget } from "../components/UserWidget.jsx";
import { TableWidget } from "../components/TableWidget.jsx";
import { OrderTodayWidget } from "../components/OrderTodayWidget.jsx";
import { SaleTodayWidget } from "../components/SaleTodayWidget.jsx";
import { MonthlyRevenueWidget } from "../components/MonthlyRevenueWidget.jsx";
import { getTodayOrders } from "../../../services/orderService.jsx";
import { getAllTables } from "../../../services/tableService.jsx";
import { getUserCounted } from "../../../services/userService.jsx";
import { getBestSelling } from "../../../services/order_detailService.jsx";
import { getSalesMonth, getSalesToday } from "../../../services/paymentService.jsx";
import socket from "../../../socket.js";

export const ManagerHome = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date())
    const [todayOrder, setTodayOrder] = useState(0);
    const [tableCounted, setTableCounted] = useState({ available: 0, occupied: 0 })
    const [userCounted, setUserCounted] = useState([])
    const [bestSelling, setBestSelling] = useState([])
    const [salesToday, setSalesToday] = useState(0)
    const [salesMonthData, setSalesMonthData] = useState([])
    const totalMonthAmount = salesMonthData.reduce((sum, item) => sum + parseFloat(item.total), 0);
    const fetchOrderToday = async () => {
        try {
            const response = await getTodayOrders()
            setTodayOrder(response.data.count)
        } catch (error) {
            console.error("Error fetching", error);
        }
    }

    const countTableStatus = async () => {
        try {
            const response = await getAllTables();
            const tableData = response.data;

            const availableCount = tableData.filter(table => table.status === 'available').length;
            const occupiedCount = tableData.filter(table => table.status === 'occupied').length;

            setTableCounted({ available: availableCount, occupied: occupiedCount });
        } catch (error) {
            console.error("Error fetching tables:", error);
        }
    };
    const countCustomer = async () => {
        try {
            const response = await getUserCounted();
            setUserCounted(response.data);
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    const fetchBestSelling = async () => {
        try {
            const response = await getBestSelling()
            setBestSelling(response.data)
        } catch (error) {
            console.error("Error fetching", error);
        }
    }

    const fetchSalesToday = async () => {
        try {
            const response = await getSalesToday()
            setSalesToday(response.data.total)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSalesMonth = async () => {
        try {
            const year = selectedMonth.getFullYear();
            const month = selectedMonth.getMonth() + 1; // Tháng bắt đầu từ 0
            const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
            const response = await getSalesMonth(yearMonth)
            setSalesMonthData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrderToday();
        countTableStatus();
        countCustomer();
        fetchBestSelling();
        fetchSalesToday();
    }, []);

    useEffect(() => {
        fetchSalesMonth()
    }, [selectedMonth])

    const handleNewPayment = () => {
        fetchSalesMonth();
        fetchSalesToday();
    };

    const handleNewInitializedOrder = () => {
        fetchOrderToday();
    }

    const handleNewPlacedOrder = () => {
        fetchBestSelling();
    }

    const updateUser = () => {
        countCustomer();
    }

    useEffect(() => {
        socket.on("receive-new-payment", handleNewPayment);
        socket.on("update-for-new-order",handleNewInitializedOrder)
        socket.on("receive-new-order",handleNewPlacedOrder)
        socket.on("receive-update-user-board",updateUser)

        return () => {
            socket.off("receive-new-payment", handleNewPayment);
            socket.off("update-for-new-order",handleNewInitializedOrder);
            socket.off("receive-new-order",handleNewPlacedOrder)
            socket.off("receive-update-user-board",updateUser)
        };
    }, []);

    return (

        <div className="w-[90%] h-auto mx-auto flex flex-col  my-10 gap-10">
            <div className="w-full flex gap-10">
                <div className="w-[70%] flex flex-col gap-10">
                    <div className="w-full grid grid-cols-[4fr_6fr] gap-x-10">
                        <TableWidget tableCounted={tableCounted} />
                        <UserWidget userCounted={userCounted} />
                    </div>
                    <div className="w-ful grid grid-cols-[4fr_6fr] gap-x-10">
                        <MonthlyRevenueWidget setSelectedMonth={setSelectedMonth} totalMonthAmount={totalMonthAmount} />

                        <div className="w-full grid grid-cols-2 gap-x-10">
                            <SaleTodayWidget salesToday={salesToday} />
                            <OrderTodayWidget todayOrder={todayOrder} />
                        </div>
                    </div>


                </div>
                <BestSellingTable bestSelling={bestSelling} />
            </div>

            <div className="w-full flex-1 border-2 border-white rounded-3xl bg-black/30 ">
                <RevenueChart selectedMonth={selectedMonth} salesMonthData={salesMonthData} />
            </div>

        </div>
    )
}