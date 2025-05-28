import { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // Import CSS cho Calendar
import { DateAndTimeUtils } from "../utils/DateAndTimeUtils";

export const CustomCalendar = ({setSelectedDate}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState();

    const toggleCalendar = () => {
        setShowCalendar(prev => !prev);
    };

    return (
        <div className="relative flex-col z-20">
            <div className="h-[80px] flex justify-between ">
                <div className="flex items-center gap-8 ">   
                    <CiCalendarDate
                        size={60}
                        className="cursor-pointer text-white"
                        onClick={toggleCalendar}
                    />

                    <h1 className="text-lg text-white font-bold">Selected date: </h1>
                    <div className="w-60 text-white text-lg">
                        {date === undefined ? "" : DateAndTimeUtils(date).date}
                    </div>
                </div>
                
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => setShowCalendar(false)}
                        className="w-[100px] px-4 py-3 border-2 border-white rounded-xl text-sm hover:cursor-pointer hover:text-green-400  
                    transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">Choose</button>
                    <button
                        onClick={() => {setDate(undefined); setSelectedDate(undefined)}}
                        className="w-[100px] px-4 py-3 border-2 border-white rounded-xl text-sm hover:cursor-pointer hover:text-red-400  
                    transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">Clear</button>
                </div>
                

            </div>

            {showCalendar && (
                <div className="absolute mt-2 z-50">
                    <Calendar
                        onChange={(selectedDate) => {
                            setDate(selectedDate);
                            setSelectedDate(selectedDate);
                          }}
                        value={date}
                        className="rounded-2xl shadow-lg shadow-black"
                    />
                </div>
            )}
        </div>
    );
};
