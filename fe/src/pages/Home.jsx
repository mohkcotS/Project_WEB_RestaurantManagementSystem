import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import { Toast } from '../components/Toast';
import * as yup from 'yup'
import axios from 'axios'
import Logo from "../assets/logo.svg";
import { images } from "../assets/homePageImg"


export const Home = () => {

  const schema = yup.object().shape({
    name: yup.string().required("Name is required!"),
    password: yup.string().min(3).required("The password must be at least 3 characters long."),
    confirmedPassword: yup.string().oneOf([yup.ref("password")], "The password must be matched!").required("The confirmed password is required!")

  })

  const { register: rRegister, handleSubmit: rHandleSubmit, reset: rReset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const { register: lRegister, handleSubmit: lHandleSubmit, reset: lReset } = useForm()
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setVisible] = useState(false)
  const [notification, setNotification] = useState({ message: "", status: "" })
  const navigate = useNavigate();

  const onLogin = async (data) => {
    try {

      console.log(data)
      const response = await axios.post("http://localhost:3001/auth/login", data);

      if (response.status === 200) {
        const { accessToken } = response.data; // Nhan token tu be

        if (accessToken) { // Check token co ton tai k?
          sessionStorage.setItem("accessToken", accessToken); // luu token vao session storage de tiep tuc xac thuc api ve sau

          const decoded = jwtDecode(accessToken); // giai ma token de lay role dieu huong
          

          // Dieu huong trang
          if (decoded.role === 'Customer') {
            navigate("/customer")
          }
          else if (decoded.role === 'Manager') {
            navigate("/manager")
          }
          else if (decoded.role === 'Cashier') {
            navigate("/cashier")
          }
          else if (decoded.role === 'Chef') {
            navigate("/chef")
          }
          else {
            setNotification({message: "Unauthorized" , status : "error"})
          }
          lReset()

        } else {
          console.error("No access token received");
        }
      }


      setNotification({ message: response.data.message, status: "success" })
      


    } catch (error) {
      console.log(error.response.data.message)
      // alert(error.response.data.message)
      setNotification({ message: error.response.data.message, status: "error" })
    }
  };


  const onRegister = async (data) => {
    const formatData = {
      "name": data.name,
      "role": "Customer",
      "password": data.password
    }

    try {

      console.log(formatData);

      const response = await axios.post("http://localhost:3001/auth/register", formatData);

      if (response.status === 201) {
        setNotification({ message: response.data.message, status: "success" })
        rReset();
        clearErrors();

      }

    } catch (error) {
      setNotification({ message: error.response.data.message, status: "error" })

    }
  }

  return (
    <div className={`h-auto w-full bg-black flex flex-col gap-y-[50px] items-center ${isVisible ? 'bg-black/90 ' : ''}`}>

      {/* Navbar */}
      <div className={`w-full h-24 bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-white text-2xl flex justify-between items-center px-40 py-8 transition-all ease-out duration-700 ${isVisible ? ' opacity-0 -translate-y-full' : 'opacity-100 translate-y-0 '}`}>
        <div className="flex gap-x-10 items-center text-center">
          <img src={Logo} alt="" className="w-15 h-15 " />
          <h2 className="uppercase cursor-pointer"> La Ratatouille <br /> RESTAURANT </h2>

        </div>
        <div className="flex gap-x-10 ">
          <h2 onClick={() => { setVisible(true); setIsLogin(true) }} className='cursor-pointer border-2 rounded-xl px-8 py-2 transition-all duration-500 hover:scale-105 active:scale-95'>Login</h2>
          <h2 onClick={() => { setVisible(true); setIsLogin(false) }} className='cursor-pointer border-2 rounded-xl px-8 py-2 transition-all duration-500 hover:scale-105 active:scale-95 '>Register</h2>
        </div>

      </div>
      {/* end nav bar */}

      {notification?.message && (<Toast message={notification.message} status={notification.status} onClose={() => setNotification(null)} />)}


      {/* img */}
      <div className={`w-[80%] h-auto flex flex-col gap-20 transition-all ease-out duration-1000 ${isVisible ? 'opacity-0 z-0 -translate-x-full' : 'opacity-100 '}`}>
        {/* img 1 2 3 */}
        <div className='w-full h-[550px] flex justify-between'>
          {/* img 1 */}
          <div className={`relative h-full w-[900px] border-4 border-cyan-400 rounded-3xl overflow-hidden transition-all ease-out duration-700 ${isVisible ? 'opacity-0 z-0 -translate-x-full' : 'opacity-100 '}`}>

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
          <div className="h-full w-[500px]  flex flex-col justify-between text-white text-xl font-semibold ">
            {/* img 2 */}
            <div className='group w-full h-[250px] border-4 border-cyan-300 rounded-3xl overflow-hidden relative'>
              <img src={images.img2} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <p>Exquisite Dining</p>
              </div>
            </div>

            {/* img3 */}
            <div className='group w-full h-[250px] border-4 border-cyan-300 rounded-3xl overflow-hidden relative'>
              <img src={images.img3} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <p>Warm & Cozy</p>
              </div>
            </div>
          </div>

        </div>

        {/* img 4 5 6 7 */}
        <div className="w-full h-[220px] flex justify-between">
          <div className='group w-[300px] h-full border-4 border-cyan-300 relative rounded-3xl overflow-hidden z-10'>
            <img src={images.img4} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center text-white text-xl font-semibold">
              <p>Beautiful Decor</p>
            </div>
          </div>

          <div className='group w-[300px] h-full border-4 border-cyan-300 relative rounded-3xl overflow-hidden z-10'>
            <img src={images.img5} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center text-white text-xl font-semibold">
              <p>Delicious Plating</p>
            </div>
          </div>

          <div className='group w-[300px] h-full border-4 border-cyan-300 relative rounded-3xl overflow-hidden z-10'>
            <img src={images.img6} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center text-white text-xl font-semibold">
              <p>Chef's Specials</p>
            </div>
          </div>

          <div className='group w-[300px] h-full border-4 border-cyan-300 relative rounded-3xl overflow-hidden z-10'>
            <img src={images.img7} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center text-white text-xl font-semibold">
              <p>Elegant Ambience</p>
            </div>
          </div>
        </div>

      </div>
      {/* end img */}

      {/* Form */}
      <div className={`w-[800px] h-[500px] rounded-3xl border-12 border-white bg-gray-200 flex justify-between overflow-hidden relative transition-all ease-out duration-700 ${isVisible ? 'opacity-100 z-20 -translate-y-[900px]' : 'opacity-0 z-0 -translate-y-full'}`}>

        <button onClick={() => {setVisible(false);lReset();rReset();}} className={`text-2xl hover:text-red-600 absolute top-5 right-8 active:scale-95 transition-colors duration-300 z-30 ${isLogin ? 'text-[#ffd900]' : 'text-black'}`} >&#10006;</button>

        {/* Login Form */}

        <div className={`absolute inset-0 flex w-full ${isLogin ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>

          <div className={`h-full w-[450px] py-10 px-6 flex flex-col justify-center items-center gap-y-6 transition-transform duration-1000 ease-out ${isLogin ? '' : 'translate-x-full'}`}>
            <h2 className="text-blue-800 text-5xl font-bold">Login</h2>
            <form onSubmit={lHandleSubmit(onLogin)} className="flex flex-col gap-y-8 w-[350px]">
              <input className="px-4 py-2 border bg-[#eeeeee] border-gray-300 rounded-lg focus:outline-none" type="text" placeholder="Name" {...lRegister("name")} />
              <input className="px-4 py-2 border bg-[#eeeeee] border-gray-300 rounded-lg focus:outline-none" type="password" placeholder="Password" {...lRegister("password")} />
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-500">Login</button>
            </form>
          </div>

          <div className={`h-full w-[350px] bg-gradient-to-b from-blue-800 via-blue-600 to-purple-700 flex flex-col text-white rounded-l-[50px] justify-center items-center gap-y-6 transition-transform duration-1000 ease-out ${isLogin ? 'z-20' : '-translate-x-full'}`}>
            <h2 className="font-bold text-3xl">Welcome Back!</h2>
            <h3>Don't have an account?</h3>
            <button onClick={() => setIsLogin(false)} className="py-2 px-10 rounded-lg font-semibold border-2 hover:px-16 active:scale-95 cursor-pointer transition-all duration-500">Register</button>
          </div>

        </div>
        {/* End login */}

        {/*  Register Form */}

        <div
          className={`absolute inset-0 flex w-full transition-transform duration-700 ease-in-out ${isLogin ? 'opacity-0 z-0' : 'opacity-100 z-20'}`}>

          <div className={`h-full w-[350px] bg-gradient-to-b from-blue-800 via-blue-600 to-purple-700 flex flex-col text-white rounded-r-[50px] justify-center items-center gap-y-6 transition-transform duration-1000 ease-out ${isLogin ? 'translate-x-full' : 'z-20'}`}>
            <h2 className="font-bold text-3xl">Join Us Today!</h2>
            <h3>Already have an account?</h3>
            <button onClick={() => setIsLogin(true)} className="py-2 px-10 rounded-lg font-semibold border-2 hover:px-16 active:scale-95 cursor-pointer transition-all duration-500">Login</button>
          </div>

          <div className={`h-full w-[450px] py-10 px-6 flex flex-col items-center justify-center gap-y-6 transition-transform duration-1000 ease-out ${isLogin ? '-translate-x-full' : ''}`}>
            <h2 className="text-blue-800 text-5xl font-bold">Register</h2>
            <form onSubmit={rHandleSubmit(onRegister)} className="flex flex-col gap-y-8 w-[350px]">
              <input className="px-4 py-2 border bg-[#eeeeee] border-gray-300 rounded-lg focus:outline-none" type="text" placeholder="Name" {...rRegister("name")} />
              <input className="px-4 py-2 border bg-[#eeeeee] border-gray-300 rounded-lg focus:outline-none" type="password" placeholder="Password" {...rRegister("password")} />
              <input className="px-4 py-2 border bg-[#eeeeee] border-gray-300 rounded-lg focus:outline-none" type="password" placeholder="Confirmed password" {...rRegister("confirmedPassword")} />
              <p className='text-red-500'>{errors.name?.message || errors.password?.message || errors.confirmedPassword?.message}</p>
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold  cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-500">Register</button>
            </form>
          </div>

        </div>
        {/* End regis */}

      </div>

      {/* End Form */}



    </div>
  );

}



