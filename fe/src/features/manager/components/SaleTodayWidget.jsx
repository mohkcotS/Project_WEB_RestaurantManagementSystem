export const SaleTodayWidget = ({salesToday}) => {
    return (
        <div className="border-2 h-30 border-white py-4 px-8 rounded-3xl text-center">
            <h3 className="text-lg font-semibold text-yellow-600">SALES TODAY</h3>
            <hr className="mb-4 mt-2 text-white" />
            <h1 className="font-bold text-xl text-green-500"> {salesToday.toFixed(2)} $</h1>
        </div>
    )
}