import { useEffect, useState } from "react";
import { getAllTables } from "../../../services/tableService.jsx";

export const TableWidget = () => {
    const [tableCounted, setTableCounted] = useState({ available: 0, occupied: 0 })
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
    useEffect(() => {
        countTableStatus();
    })
    return (
        <div className="border-2 h-44 border-white py-6 px-8 rounded-3xl">
            <h3 className="text-xl font-semibold text-yellow-600">TABLES</h3>
            <hr className="mb-6 mt-2 text-white" />
            <div className="flex gap-20 text-white ">
                <div className="grid grid-rows-2 gap-4 font-bold">
                    <h1>AVAILABLE</h1>
                    <h1>SERVE</h1>
                </div>

                <div className="grid grid-rows-2 gap-4 text-xl">
                    <h1 className="text-green-400">{tableCounted.available}</h1>
                    <h1 className="text-red-400">{tableCounted.occupied}</h1>
                </div>
            </div>

        </div>
    )
}