export const OrderTodayWidget = ({todayOrder}) => {
    
    return (
        <div className="border-2 h-40 border-white py-6 px-8 rounded-3xl text-center">
            <h3 className="text-xl font-semibold text-yellow-600">ORDERS TODAY</h3>
            <hr className="mb-6 mt-2 text-white" />
            <h1 className="font-bold text-2xl text-white"> {todayOrder} </h1>
        </div>
    )
}