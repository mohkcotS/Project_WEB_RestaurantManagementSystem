export const UserWidget = ({userCounted}) => {
    return (
        <div className="border-2 h-36 border-white py-6 px-8 rounded-3xl text-center">
            <h3 className="text-lg font-semibold text-yellow-600">NO. OF USER</h3>
            <hr className="mb-3 mt-2 text-white" />
            <div className="w-full grid grid-cols-4 justify-center font-semibold">
                
                <div className="w-[100px] flex flex-col items-center gap-1">
                    <h2 className="font-semibold text-md text-[#AEEEEE]">Customer</h2>
                    <h2 className="text-xl text-white">{userCounted.customer}</h2>
                </div>

                <div className="w-[100px] flex flex-col items-center gap-1 ">
                    <h2 className="font-semibold text-md text-[#FFDAB9]">Manager</h2>
                    <h2 className="text-xl text-white">{userCounted.manager}</h2>
                </div>
                
                <div className="w-[100px] flex flex-col items-center gap-1 ">
                    <h2 className="font-semibold text-md text-[#D8BFD8]">Chef</h2>
                    <h2 className="text-xl text-white">{userCounted.chef}</h2>
                </div>
                
                <div className="w-[100px] flex flex-col items-center gap-1">
                    <h2 className="font-semibold text-md text-[#B5EAD7]">Cashier</h2>
                    <h2 className="text-xl text-white">{userCounted.cashier}</h2>
                </div>

            </div>

        </div>
    )
}