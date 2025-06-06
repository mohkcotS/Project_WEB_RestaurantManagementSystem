import { CustomerDishSection } from "../components/CustomerDishSection";
import { CustomerOrderPanel } from "../components/CustomerOrderPanel";
import { useState, useEffect } from "react";
import { getAllDishes } from "../../../services/DishService";
import { useOutletContext, useNavigate } from "react-router-dom"
import { createOrderDetail } from "../../../services/order_detailService";
import { OrderConfirmation } from "../components/OrderConfirmation";
import socket from "../../../socket";

export const CustomerOrder = () => {

    const [dishes, setDishes] = useState([])
    const [choose, setChoose] = useState("All")
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([])
    const [openPanel, setOpenPanel] = useState(false)
    const [orderConfirmation, setOrderConfirmation] = useState(false)
    const {setNotification, currentOrder} = useOutletContext()
    const navigate = useNavigate();
    const confirmation = JSON.parse(sessionStorage.getItem("confirmation"));
    if (!confirmation) {
        setNotification({ message: "Please select a table.", status: "error" });
        navigate("/customer/table");
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllDishes();
            setDishes(response.data)
        };
        fetchData() 
    }, [])

    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const foodCategory = [
        { label: "All", value: "All" },
        { label: "Appetizer", value: "Appetizer" },
        { label: "Main Course", value: "Main Course" },
        { label: "Dessert", value: "Dessert" },
        { label: "Side Dish", value: "Side Dish" },
        { label: "Beverage", value: "Beverage" },
    ];

    const handleOrder = async (cart) => {
        const data = [];
        cart.forEach(od => {
            data.push({
                quantity: od.quantity,
                price: od.dish.price,
                DishId: od.dish.id,
                OrderId: currentOrder.id
            });
        });


        try {
            if (data.length != 0) {
                const response = await createOrderDetail(data);
                setNotification({ message: response.data.message, status: "success" });
                setCart([])
                setOrderConfirmation(false)
                socket.emit("new-order-placed")
            }

            else {
                setNotification({ message: "Please choose your dish", status: "error" });
                setOrderConfirmation(false)
            }

        } catch (error) {
            setNotification(error);
        }
    };
    return (
        <div className="w-[90%] h-auto mx-auto flex flex-col gap-16 p-10">
            <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center w-full ">
                    <div className="w-full text-xl text-white flex">
                        {foodCategory.map((item) => (
                            <div
                                key={item.value}
                                onClick={() => setChoose(item.value)}
                                className="cursor-pointer hover:scale-110 transition-transform duration-700 flex-1"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <span>{item.label}</span>
                                    <span className={`h-1 bg-cyan-300 transition-all duration-300 origin-left transform 
                                ${choose === item.value ? "scale-x-100" : "scale-x-0"} w-full rounded-3xl `}
                                    ></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[100%]">
                    <input
                        type="text"
                        placeholder="Search dish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-[20%] px-10 py-3 border-2 border-white rounded-xl text-white focus:outline-none text-sm"
                    />
                </div>

            </div>

            <div className="w-full flex gap-20">
                <div className="w-full flex flex-col gap-10" >
                    {foodCategory.map(cate => (
                        cate.label !== "All" ? <CustomerDishSection title={cate.label} dishes={filteredDishes} choose={choose} cart={cart} setCart={setCart} /> : null
                    ))}
                </div>

                <div className="fixed bottom-10 right-10 w-[30%] z-10">
                    <CustomerOrderPanel cart={cart} setCart={setCart} openPanel={openPanel} setOpenPanel={setOpenPanel} 
                     currentOrder={currentOrder} setOrderConfirmation={setOrderConfirmation}/>
                </div>        
            </div>
            
            {orderConfirmation && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"> 
            <OrderConfirmation setOrderConfirmation={setOrderConfirmation} handleOrder={handleOrder} cart={cart} /></div>}
            

        </div>
    )
}