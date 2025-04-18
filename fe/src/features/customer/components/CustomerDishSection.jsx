import { CustomerDishCard } from "./CustomerDishCard"

export const CustomerDishSection = ({title, dishes, choose, cart , setCart}) => {
    if (choose !== "All" && title !== choose) {
        return null;
    }
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-yellow-300 text-3xl font-bold">{title}</h1>
            <div className="w-[100%] grid grid-cols-3 gap-10">
                {dishes
                .filter(dish => dish.type === title)
                .map(dish => (
                    <CustomerDishCard dish={dish}  cart={cart} setCart={setCart} />
                ))}
            </div>
        </div>
    )
}