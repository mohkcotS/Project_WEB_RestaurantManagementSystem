export const DishCategorySection = ({title,type,dishes,seteditId,setOpenEdit,setOpenDelete}) => {
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-yellow-300 text-3xl font-bold">{title}</h1>
            <div className="grid grid-cols-3 gap-10">
                {dishes
                .filter(dish => dish.type === type)
                .map(dish => (
                        <div className=" p-6 border-4 rounded-3xl text-white flex flex-col gap-10">
                            <div className="flex gap-10 items-center">
                                <div className="w-[50%] ">
                                    <img src={dish.imageUrl} alt="" className="w-[100%] aspect-square rounded-3xl border-4" />
                                </div>
                                <div className="w-[50%] flex flex-col gap-5 text-center">
                                    <h1 className="text-green-300 font-bold text-xl">{dish.name}</h1>
                                    <h1 className="text-lg"> <strong>Price: </strong>${dish.price}</h1>
                                </div>
                            </div>

                            <div className="flex justify-center gap-10">
                                <button
                                    onClick={()=>  {seteditId(dish.id); setOpenEdit(true)}}
                                    className="rounded-xl border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500  hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 z-1">Edit</button>
                                <button
                                    onClick={()=>  {seteditId(dish.id); setOpenDelete(true)}}
                                    className="rounded-xl border-2 border-red-500 hover:cursor-pointer hover:bg-red-500 hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2 ">Delete</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}