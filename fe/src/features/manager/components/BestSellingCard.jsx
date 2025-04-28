export const BestSellingCard = ({dish , index}) => {
    return (
        <div className="grid grid-cols-[1fr_5fr_1fr] w-full items-center px-4 ">
            <h1 className="">{index + 1}</h1>
            <h1 className="text-green-300 text-[16px]">{dish.name}</h1>
            <h1 className="text-center">{dish.quantity}</h1>
        </div>
    )
}