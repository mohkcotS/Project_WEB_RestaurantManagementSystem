import { BestSellingCard } from "../components/BestSellingCard.jsx";
import { useEffect, useState } from "react";
import { getBestSelling } from "../../../services/order_detailService.jsx";

export const BestSellingTable = () => {
    const [bestSelling, setBestSelling] = useState([])
    const fetchBestSelling = async () => {
        try {
            const response = await getBestSelling()
            setBestSelling(response.data)
        } catch (error) {
            console.error("Error fetching", error);
        }
    }
    useEffect(() => {
        fetchBestSelling();

    })
    return (
        <div className="flex flex-col  items-center w-[30%] border-2 border-gray-200 rounded-3xl 
                px-6 py-6 text-white">

            <h1 className="text-center text-3xl font-bold mb-2 text-yellow-600">Best-selling Dishes Today</h1>
            <hr className="w-full border-white" />

            <div className="w-full flex flex-col py-2 text-lg font-semibold">

                <div className="grid grid-cols-[1fr_5fr_1fr] w-full py-2 text-white px-4">
                    <h2>No.</h2>
                    <h2>Name</h2>
                    <h2>Quantity</h2>
                </div>

                <div className="flex flex-col gap-5">
                    {bestSelling.map((dish, index) => (
                        <BestSellingCard dish={dish} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}