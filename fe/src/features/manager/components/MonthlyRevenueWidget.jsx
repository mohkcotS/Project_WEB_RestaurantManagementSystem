import { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; 

export const MonthlyRevenueWidget = ({setSelectedMonth}) => {
    const [openCalendar, setOpenCalendar] = useState(false)
    const [month, setMonth] = useState(new Date());
    const formatMonthAndYear = (date) => {
        return ({
            month: date.toLocaleString('en-US', { month: 'long' }),
            year: date.getFullYear()
        })
        
        
        
      };
    return (
        <div className="border-2 h-40 border-white py-6 px-8 rounded-3xl ">
            <div className="flex justify-between items-center relative">
                <h3 className="text-xl font-semibold text-yellow-600">MONTHLY REVENUES</h3>
                <div className="relative"> {/* Bọc riêng icon + calendar */}
                    <CiCalendarDate
                        onClick={() => { setOpenCalendar(!openCalendar) }}
                        size={30}
                        className="cursor-pointer text-white"
                    />
                    {openCalendar && (
                        <div className="absolute right-0 mt-2 z-50">
                            <Calendar
                                view="year"
                                onClickMonth={(selectedMonth) => {
                                    setMonth(selectedMonth);
                                    setOpenCalendar(false);
                                    setSelectedMonth(selectedMonth)
                                }}
                                value={month}
                                className="rounded-2xl shadow-lg shadow-black"
                            />
                        </div>
                    )}
                </div>
            </div>

            <hr className="mb-6 mt-2 text-white" />
            <div className="flex justify-between ">
                <h1 className="font-bold text-2xl text-green-500 items-center">100 $</h1>
                <h1 className="text-gray-400 text-lg">[{formatMonthAndYear(month).month} {formatMonthAndYear(month).year}  ]</h1>
            </div>
        </div>
    )
}