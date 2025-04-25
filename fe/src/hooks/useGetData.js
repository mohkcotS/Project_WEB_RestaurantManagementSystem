import { useEffect } from "react"

export const useGetData = (selectedTable, setSelectedTable,confirmation, setConfirmation,currentOrder, setCurrentOrder) => {
    useEffect(() => {
        try {
            console.log("useGetData chạy!");
            const isTableEmpty = !selectedTable || Object.keys(selectedTable).length === 0;
            const isOrderEmpty = !currentOrder || Object.keys(currentOrder).length === 0;
            const isConfirmationFalse = confirmation === false;

            if (isTableEmpty || isOrderEmpty || isConfirmationFalse) {
                const storedTable = sessionStorage.getItem("table");
                const storedOrder = sessionStorage.getItem("order");
                const storedConfirmation = sessionStorage.getItem("confirmation");

                if (storedTable) setSelectedTable(JSON.parse(storedTable));
                if (storedOrder) setCurrentOrder(JSON.parse(storedOrder));
                if (storedConfirmation !== null) setConfirmation(JSON.parse(storedConfirmation));
            }
        } catch (error) {
            console.error("Error parsing sessionStorage data:", error);
        }
    }, []);
    
}