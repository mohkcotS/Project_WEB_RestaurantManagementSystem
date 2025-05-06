import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { CashierTableCard } from "../components/CashierTableCard";
import { getAllTables, getTableById } from "../../../services/tableService";
import socket from "../../../socket";

export const CashierHome = () => {
    const {setNotification, checkoutIds, setCheckoutIds}  = useOutletContext()
    const [tables, setTables] = useState([])
    const updateTableList = async () => {
        try {
            const response = await getAllTables();
            setTables(response.data);
        } catch (error) {
            console.log(error)
        }    
    };

    const handleCheckout = async(data) => {
        setCheckoutIds(prevCheckoutIds => {
            if (prevCheckoutIds.includes(data.TableId)) {
                return prevCheckoutIds;
            } else {
                return [...prevCheckoutIds, data.TableId];
            }
        });
        const response = await getTableById(data.TableId)
        setNotification({message: "Table " + response.data.name + " wants to checkout" ,status:"success"})
    }

    const handleNewPayment = (data) => {
        setCheckoutIds(prevCheckoutIds => {
            if (prevCheckoutIds.includes(data.TableId)) {
                return prevCheckoutIds.filter(id => id !== data.TableId);
            } else {
                return [...prevCheckoutIds, data.TableId];
            }
        });

        console.log(checkoutIds)
    }

    useEffect(() => {
        updateTableList()
    }, []);

    useEffect(() => {
        socket.on("update-for-new-order",updateTableList)
        socket.on("receive-checkout", handleCheckout)
        socket.on("receive-new-payment",handleNewPayment)

        return () => {
            socket.off("update-for-new-order", updateTableList);
            socket.off("receive-checkout",handleCheckout)
            socket.off("receive-new-payment",handleNewPayment)
        };
    }, []);


    return(
        <div className="w-[80%] mx-auto flex flex-col my-10">
            <div className="grid grid-cols-3 place-items-center gap-10">
            {tables.map(tb => (<CashierTableCard tb={tb} setNotification={setNotification} updateTableList={updateTableList} checkoutIds={checkoutIds} />)) }
            </div>
            
        </div>
    )
}