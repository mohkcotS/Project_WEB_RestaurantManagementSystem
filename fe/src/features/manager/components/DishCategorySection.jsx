export const DishCategorySection = ({ title, type, dishes, seteditId, setOpenEdit, setOpenDelete }) => {
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-yellow-300 text-xl font-bold">{title}</h1>
            <div className="grid grid-cols-3 gap-x-15 gap-y-10">
                {dishes
                    .filter(dish => dish.type === type)
                    .map(dish => (
                        <div className=" p-6 bg-white/10 shadow-lg  shadow-white/50 hover:shadow-white/80 transition-all duration-300 rounded-3xl text-white flex flex-col gap-6">
                            <div className="flex gap-6 items-center">
                                <div className="w-[40%] ">
                                    <img src={dish.imageUrl} alt="" className="w-[100%] aspect-square border-4 border-blue-300 rounded-xl" />
                                </div>
                                <div className="w-[60%] flex flex-col gap-3 ">
                                    <h1 className="font-bold text-sm text-amber-400">{dish.name}</h1>
                                    <h1 className="text-sm"> <strong className="text-gray-300">Price: </strong>${dish.price}</h1>
                                    <div >
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${dish.status === "sold out"
                                                ? "bg-red-900/60 text-red-300"
                                                : "bg-emerald-900/60 text-emerald-300"
                                            }`}>
                                            {dish.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-10">
                                <button
                                    onClick={() => { seteditId(dish.id); setOpenEdit(true) }}
                                    className="rounded-xl bg-blue-700 hover:cursor-pointer hover:bg-blue-500 text-sm hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 font-semibold">Edit</button>
                                <button
                                    onClick={() => { seteditId(dish.id); setOpenDelete(true) }}
                                    className="rounded-xl bg-red-700 hover:cursor-pointer hover:bg-red-500 text-sm hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 font-semibold ">Delete</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}