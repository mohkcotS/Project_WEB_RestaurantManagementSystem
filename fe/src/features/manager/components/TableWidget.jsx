export const TableWidget = ({tableCounted}) => {
    return (
        <div className="border-2 h-44 border-white py-6 px-8 rounded-3xl">
            <h3 className="text-xl font-semibold text-yellow-600">TABLES</h3>
            <hr className="mb-6 mt-2 text-white" />
            <div className="flex gap-20 text-white ">
                <div className="grid grid-rows-2 gap-4 font-bold">
                    <h1>AVAILABLE</h1>
                    <h1>SERVE</h1>
                </div>

                <div className="grid grid-rows-2 gap-4 text-xl">
                    <h1 className="text-green-400">{tableCounted.available}</h1>
                    <h1 className="text-red-400">{tableCounted.occupied}</h1>
                </div>
            </div>

        </div>
    )
}