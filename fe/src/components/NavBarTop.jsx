export const NavBarTop = ({currentUser, title}) => {
    return (
        <div className="flex flex-col pt-2 px-20">

            <div className="w-full flex justify-between items-center py-4 px-10">

                <h1 className="font-bold text-3xl text-cyan-400 tracking-wide">La Ratatouille</h1>

                <div className="flex gap-10 items-center">
                    <div
                        className="w-14 h-14 bg-white text-cyan-600 flex items-center justify-center text-xl font-bold 
                                    hover:cursor-pointer rounded-full">
                        {currentUser.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="text-white">
                        <h1 className="text-xl font-bold">{currentUser.name}</h1>
                        <h1 className="text-sm text-gray-400">{currentUser.role}</h1>
                    </div>

                </div>

            </div>

            <h1 className="font-bold text-4xl text-white tracking-wide text-center">{title}</h1>
        </div>
    )
}