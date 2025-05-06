import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../services/userService';
import socket from '../socket';


export const LoginAndRegisterForm = ({isLogin, setIsVisible, setIsLogin, setNotification}) => {

    const schema = yup.object().shape({
        name: yup.string().required("Name is required!"),
        password: yup.string().min(3).required("The password must be at least 3 characters long."),
        confirmedPassword: yup.string().oneOf([yup.ref("password")], "The password must be matched!").required("The confirmed password is required!")

    })

    const { register: rRegister, handleSubmit: rHandleSubmit, reset: rReset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const { register: lRegister, handleSubmit: lHandleSubmit, reset: lReset } = useForm()

    const navigate = useNavigate();

    const onLogin = async (data) => {
        try {
            const response = await login(data)
            const { accessToken, message } = response.data;

            if (accessToken) {
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("message", JSON.stringify({ message: message, status: "success" }));
                const decoded = jwtDecode(accessToken);

                // Dieu huong trang
                if (decoded.role === 'Customer') {
                    navigate("/customer/table")
                }
                else if (decoded.role === 'Manager') {
                    navigate("/manager/home")
                }
                else if (decoded.role === 'Cashier') {
                    navigate("/cashier")
                }
                else if (decoded.role === 'Chef') {
                    navigate("/chef")
                }
                else {
                    setNotification({ message: "Unauthorized", status: "error" })
                }
                lReset()

            } else {
                console.error("No access token received");

            }

            setNotification({ message: response.data.message, status: "success" })

        } catch (error) {
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

            const response = await register(formatData)
            setNotification({ message: response.data.message, status: "success" })
            socket.emit("update-user-board")
            rReset();
            clearErrors();

        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })

        }
    }
    return (
        <div className={`w-[800px] h-[500px] rounded-3xl border-12 border-white bg-gray-200 flex justify-between overflow-hidden relative transition-all ease-out duration-700`}>

        <button onClick={() => {setIsVisible(false);lReset();rReset();}} className={`text-2xl hover:text-red-600 absolute top-5 right-8 active:scale-95 transition-colors duration-300 z-30 cursor-pointer ${isLogin ? 'text-[#ffd900]' : 'text-black'}`} >&#10006;</button>

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



    )
}