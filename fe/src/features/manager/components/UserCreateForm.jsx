import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createUser } from '../../../services/userService'
import socket from '../../../socket'

export const UserCreateForm = ({setOpenForm,setNotification,updateUserList}) => {

    const schema = yup.object().shape({
        name: yup.string().required("Name is required!"),
        role: yup.string().notOneOf([""], "Select a valid role!").required("Role is required!"),
        password: yup.string().min(3).required("The password must be at least 3 characters long."),
        confirmedPassword: yup.string().oneOf([yup.ref("password")], "The password must be matched!").required("The confirmed password is required!")

    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        delete data.confirmedPassword;
        try {
            const response = await createUser(data)

            if (response.status === 201) {
                updateUserList();
                setNotification({ message: response.data.message, status: "success" })
                socket.emit("update-user-board")
                reset();
            }

        } catch (error) {
            setNotification(error)
            reset({ name: "", role: data.role, password: data.password, confirmedPassword: "" });

        }

    }

    return (
        <div className='w-[400px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-xl font-bold'>
                <h2 className='text-blue-500'>Create User</h2>
                <button onClick={()=>setOpenForm(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3 text-sm '>
                <input className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' type="text" placeholder='Name...' {...register("name")} />
                < select className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' {...register("role")}>
                    <option value="">Select Role</option>
                    <option value="Customer">Customer</option>
                    <option value="Manager">Manager</option>
                    <option value="Chef">Chef</option>
                    <option value="Cashier">Cashier</option>
                </select>
                <input className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' type="password" placeholder='Password...'{...register("password")} />
                <input className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' type="password" placeholder='Confirmed Password...' {...register("confirmedPassword")} />
                <p className='text-red-500'>
                    {errors.name?.message ||
                        errors.role?.message ||
                        errors.password?.message ||
                        errors.confirmedPassword?.message}
                </p>

                <button className='mx-auto w-[50%] bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 
                    hover:w-[70%] transition-all duration-700 cursor-pointer'>Create</button>

            </form>
            

        </div>



    )
}