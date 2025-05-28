import { getDishById, updateDishById } from "../../../services/DishService";
import { useEffect, useState } from "react";
 
export const DishEditForm = ({ editId , setOpenEdit, setNotification , updateDishList}) => {
    const [dish, setDish] = useState({ name: "", type: "",price: "" , status: "" ,imageUrl: "" });

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const response = await getDishById(editId);
                setDish(response.data); 
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (editId) fetchDish();
    }, [editId]);

    const handleSubmit = async (e)   => {
        e.preventDefault();
        try {
            const response = await updateDishById(editId,dish)
            updateDishList();
            setOpenEdit(false)
            setNotification({ message: response.data.message , status: "success" })
            
        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })
        }
    }

    return (
        <div className='w-[400px] h-auto rounded-3xl bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-xl font-bold'>
                <h2 className='text-blue-500'>Edit Dish Information</h2>
                <button onClick={()=> setOpenEdit(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-3 text-sm '>
                <input 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    type="text" 
                    placeholder='Name...'
                    value={dish.name}
                    onChange={(e) => setDish({ ...dish, name: e.target.value })}
                />

                <select 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    value={dish.type}
                    onChange={(e) => setDish({ ...dish, type: e.target.value })}
                >
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="Beverage">Beverage</option>
                </select>

                <input 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    type="number" 
                    step={0.1}
                    placeholder='Price...'
                    value={dish.price}
                    onChange={(e) => setDish({ ...dish, price: e.target.value })}
                />


                <select 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    value={dish.status}
                    onChange={(e) => setDish({ ...dish, status: e.target.value })}
                >
                    <option value="available">Available</option>
                    <option value="sold out">Sold out</option>

                </select>

                <input 
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' 
                    type="text" 
                    placeholder='Url...'
                    value={dish.imageUrl}
                    onChange={(e) => setDish({ ...dish, imageUrl: e.target.value })}
                />

                <button 
                    className='mx-auto w-[50%] bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 
                    hover:w-[70%] transition-all duration-700 cursor-pointer'>
                    Update
                </button>
            </form>
        </div>
    );
};
