import { useEffect, useState, useMemo } from "react"
import { getAllDishes } from "../../../services/DishService"; 
import {DishCreateForm} from "../components/DishCreateForm";
import { DishEditForm } from "../components/DishEditForm";
import { DishCategorySection } from "../components/DishCategorySection";
import {DishDeleteForm} from "../components/DishDeleteForm";
import { useOutletContext } from "react-router-dom"

export const ManagerDish = () => {
    const  setNotification  = useOutletContext()
    const [choose, setChoose] = useState("All")
    const [dishes, setDishes] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [openCreate, setOpenCreate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [editId, seteditId] = useState(null);

    const foodCategory = [
        { label: "All", value: "All" },
        { label: "Appetizer", value: "Appetizer" },
        { label: "Main Course", value: "Main Course" },
        { label: "Dessert", value: "Dessert" },
        { label: "Side Dish", value: "Side Dish" },
        { label: "Beverage", value: "Beverage" },
    ];

    const filteredDishes = useMemo(() => {
        return dishes.filter(dish => {
            const matchesName = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesName;
        });
    }, [dishes, searchTerm]);

    const updateDishList = async () => {
        const response = await getAllDishes();
        setDishes(response.data);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllDishes();
            setDishes(response.data)
            console.log(response.data)
        };
        fetchData()
    }, [])

    
   
    return (
        <div className="w-[80%] h-auto mx-auto flex flex-col my-10 gap-20">
            <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">

                    <div className="text-2xl text-white flex gap-20">
                        {foodCategory.map((item) => (
                            <div
                                key={item.value}
                                onClick={() => setChoose(item.value)}
                                className="cursor-pointer hover:scale-110 transition-transform duration-700"
                            >
                                <div className="flex flex-col items-center">
                                    <span>{item.label}</span>
                                    <span className={`h-1 bg-cyan-300 transition-all duration-300 origin-left transform 
                                ${choose === item.value ? "scale-x-100" : "scale-x-0"} w-[70%] rounded-3xl `}
                                    ></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                    onClick={()=>{setOpenCreate(true)}}
                        className="px-8 py-3 border-2 border-white rounded-xl text-xl hover:cursor-pointer hover:text-green-400  transition-all duration-500 hover:scale-105 active:scale-95 text-white font-bold">
                        Create Dish
                    </button>
                </div>

                <div className="w-[100%]">
                    <input
                        type="text"
                        placeholder="Search dish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-[30%] px-10 py-4 border-2 border-white rounded-xl text-white focus:outline-none text-xl"
                    />
                </div>

            </div>

            <div className="flex flex-col gap-10">
                {(choose === 'Appetizer' || choose === 'All') &&
                <DishCategorySection title="Appetizer" type="Appetizer" dishes={filteredDishes} seteditId={seteditId} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete}/> }
               
                {(choose === 'Main Course' || choose === 'All') &&
                <DishCategorySection title="Main Course" type="Main Course" dishes={filteredDishes} seteditId={seteditId} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete}/> }
               
                {(choose === 'Dessert' || choose === 'All') &&
                <DishCategorySection title="Dessert" type="Dessert" dishes={filteredDishes} seteditId={seteditId} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete}/> }
               
                {(choose === 'Side Dish' || choose === 'All') &&
                <DishCategorySection title="Side Dish" type="Side Dish" dishes={filteredDishes} seteditId={seteditId} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete}/> }
               
                {(choose === 'Beverage' || choose === 'All') &&
                <DishCategorySection title="Beverage" type="Beverage" dishes={filteredDishes} seteditId={seteditId} setOpenEdit={setOpenEdit} setOpenDelete={setOpenDelete}/> }
               
            </div>



            {/*create table */}
            {openCreate && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><DishCreateForm setOpenCreate={setOpenCreate} setNotification={setNotification} updateDishList = {updateDishList}/></div>}
            {/*edit table */}
            {openEdit && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><DishEditForm editId={editId} setOpenEdit={setOpenEdit} setNotification={setNotification} updateDishList = {updateDishList} /></div>}
            {/* Delete form */}
            {openDelete && <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-20"><DishDeleteForm editId={editId} setOpenDelete = {setOpenDelete} setNotification = {setNotification} updateDishList = {updateDishList} /></div>}

        </div>
    )
}