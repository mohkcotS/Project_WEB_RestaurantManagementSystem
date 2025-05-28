export const TableWidget = ({tableCounted}) => {
    return (
        <div className="border-2 h-36 border-white py-4 px-8 rounded-3xl">
            <h3 className="text-lg font-semibold text-yellow-600">TABLES</h3>
            <hr className="mb-3 mt-2 text-white" />
            <div className="flex gap-20 text-white">
                <div className="grid grid-cols-2 gap-x-16 gap-y-3 font-bold text-md">
                    <div>AVAILABLE</div>
                    <div className="text-green-400">{tableCounted.available}</div>
                    <div>SERVE</div>
                    <div className="text-red-400">{tableCounted.occupied}</div>
                </div>
            </div>

        </div>
    )
}