export const OrderTodayWidget = ({todayOrder}) => {
    
    return (
        <div className="border-2 h-30 border-white py-4 px-8 rounded-3xl text-center">
            <h3 className="text-lg font-semibold text-yellow-600">ORDERS TODAY</h3>
            <hr className="mb-4 mt-2 text-white" />
            <h1 className="font-bold text-xl text-white"> {todayOrder} </h1>
        </div>
    )
}