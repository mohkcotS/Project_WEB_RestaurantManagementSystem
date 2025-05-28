export const CustomerTableCard = ({tb,selectedTable, confirmation, setSelectedTable }) =>{
    return (
        <div className={`relative w-[330px] h-[180px] border-4 p-8 rounded-3xl 
            ${tb.status === "available" ? " border-white" : "border-white/20"} 
            ${(tb.id !== selectedTable.id && confirmation === true ) ? " border-white/20" : ""} 

            `}>
                <div className="flex justify-between">
                    <h1 className={`text-xl font-bold 
                        ${(tb.status === "available" && confirmation === false ) ? " border-white" : "border-white/20"} 
                        ${(tb.id === selectedTable.id && confirmation === true ) ? "z-1" : "z-0"}
                    `}>{tb.name}</h1>
                    <h1 className="text-xl font-bold text-yellow-300">{tb.type}</h1>
                </div>
                <h2 className={`text-center text-xl mb-5 
                    ${tb.status === "available" ? "text-green-500" : "text-red-500"}`}>{tb.status}</h2>

                <div className="flex justify-center gap-10">
                    <button 
                    onClick={()=>  {setSelectedTable(tb)}}
                    className="rounded-xl text-sm border-2 border-blue-500 hover:cursor-pointer hover:bg-blue-500  hover:scale-105 active:scale-95 duration-300 text-white px-8 py-2">Choose</button>
                </div> 
                {tb.status === "occupied" && <div className="absolute inset-0 bg-black/50 rounded-3xl"></div>} 
                {tb.id === selectedTable.id && <div className="absolute inset-0 bg-black/90 rounded-3xl flex justify-center items-center text-2xl font-bold">Your Table</div>} 
                {(tb.id !== selectedTable.id && confirmation === true ) && <div className="absolute inset-0 bg-black/70 rounded-3xl flex justify-center items-center text-3xl"></div>} 
            </div>
    )
}