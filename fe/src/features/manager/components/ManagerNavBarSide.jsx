import { svg } from "../../../assets/managerPageSvg"

export const ManagerNavBarSide = ({selectedIcon, setSelectedIcon}) => {
        const icons = [
            { id: "home", src: svg.home },
            { id: "user", src: svg.user },
            { id: "table", src: svg.table },
            { id: "order", src: svg.order },
            { id: "food", src: svg.food },
            { id: "logout", src: svg.logout },
        ]
        const selectedIndex = icons.findIndex((icon) => icon.id === selectedIcon);
        const translateY = selectedIndex * 96;
    return (
        <div>
            <div className="flex flex-col flex-shrink-0 px-4
                            gap-y-6 items-center pt-32  min-h-screen z-20 sticky top-0 ">


                <div className="absolute w-[72px] h-[72px] border-4  border-cyan-500 rounded-3xl transition-transform duration-500"
                    style={{ transform: `translateY(${translateY}px)` }}></div>


                {icons.map((icon) => (
                    <img key={icon.id} src={icon.src} className="h-[72px] w-[72px] rounded-3xl p-4 cursor-pointer transition-all duration-300 z-10"
                        onClick={() => setSelectedIcon(icon.id)} />))}
            </div>
        </div>

    )

}