import { useState } from 'react';
import { Toast } from '../components/Toast';
import Logo from "../assets/logo.svg";
import { images } from "../assets/homePageImg"
import { useCheckNotification } from '../hooks/useCheckNotification';
import { LoginAndRegisterForm } from '../components/LoginAndRegisterForm';


export const Home = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isVisible,setIsVisible] = useState(false)
  const [notification, setNotification] = useState({ message: "", status: "" })

  useCheckNotification(setNotification)

  const image = [
    { src: images.img2, label: 'Exquisite Dining' },
    { src: images.img3, label: 'Warm & Cozy' },
    { src: images.img4, label: 'Beautiful Decor' },
    { src: images.img5, label: 'Delicious Plating' },
    { src: images.img6, label: "Chef's Specials" },
    { src: images.img7, label: 'Elegant Ambience' },
  ];

  return (
    <div className={`h-screen w-full bg-black flex flex-col gap-y-[50px] items-center relative`}>

      {/* Navbar */}
      <div className={`w-full h-20 bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-white text-lg flex justify-between items-center px-20 py-8 transition-all ease-out duration-700 ${isVisible ? ' opacity-0 -translate-y-full' : 'opacity-100 translate-y-0 '}`}>
        <div className="flex gap-x-10 items-center text-center">
          <img src={Logo} alt="" className="w-10 h-10 " />
          <h2 className="uppercase cursor-pointer"> La Ratatouille <br /> RESTAURANT </h2>

        </div>
        <div className="flex gap-x-6 ">
          <h2 onClick={() => {setIsVisible(true); setIsLogin(true) }} className='cursor-pointer border-2 rounded-xl px-6 py-2 transition-all duration-500 hover:scale-105 active:scale-95'>Login</h2>
          <h2 onClick={() => {setIsVisible(true); setIsLogin(false) }} className='cursor-pointer border-2 rounded-xl px-6 py-2 transition-all duration-500 hover:scale-105 active:scale-95 '>Register</h2>
        </div>

      </div>
      {/* end nav bar */}

      {notification?.message && <div className='z-20 absolute top-5 right-5'>(<Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} />)</div>}

      {/* img */}
      <div className={` w-[90%] 2xl:w-[80%] h-auto flex flex-col gap-10 transition-all ease-out duration-1000 ${isVisible ? 'opacity-0 z-0 -translate-x-full' : 'opacity-100 '}`}>
        <div className='w-full h-[350px]  xl:h-[400px] flex justify-between'>
          {/* img 1 */}
          <div className={`relative h-full w-[55%] border-4 border-cyan-400 rounded-3xl overflow-hidden transition-all ease-out duration-700 ${isVisible ? 'opacity-0 z-0 -translate-x-full' : 'opacity-100 '}`}>

            <img src={images.img1} className="w-full h-full object-cover brightness-40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
              <h1 className="text-5xl font-bold uppercase">
                La Ratatouille
              </h1>
              <p className="text-lg font-medium italic mt-2 drop-shadow-md">
                "A Taste of Elegance & Passion"
              </p>
            </div>

          </div>

          {/* img 2 3 */}
          <div className="h-full w-[40%]  flex flex-col justify-between text-white text-xl font-semibold ">
            {image.slice(0, 2).map(obj => (
                <div className='w-full h-[160px] xl:h-[180px] border-4 border-cyan-300 rounded-3xl overflow-hidden relative'>
                <img src={obj.src} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    {obj.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* img 4 5 6 7 */}
        <div className="w-full h-[200px] xl:h-[220px] flex justify-between text-white text-xl font-semibold">
          {image.slice(2, 6).map(obj => (
                  <div className='w-[210px] xl:w-[280px] h-full border-4 border-cyan-300 rounded-3xl overflow-hidden relative'>
                  <img src={obj.src} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      {obj.label}
                  </div>
                </div>
              ))}
        </div>

      </div>
      {/* end img */}

      {/* Form */}
     

      {isVisible && <div className='fixed top-50 left-0 w-screen h-screen bg-black/50 flex justify-center z-20'>
          <LoginAndRegisterForm isLogin={isLogin} isVisible={isVisible} setIsVisible={setIsVisible} setIsLogin={setIsLogin} setNotification={setNotification}/>
        </div>  }

    </div>
  );

}



