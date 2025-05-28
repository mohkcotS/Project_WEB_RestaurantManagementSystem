import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createTable } from '../../../services/tableService'

export const TableCreateForm = ({setOpenCreate,setNotification, updateTableList}) => {

    const schema = yup.object().shape({
        name: yup.string().required("Name is required!"),
        type: yup.string().notOneOf([""], "Select a valid type!").required("Type is required!"),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log(data);

        try {

            const response = await createTable(data)

            if (response.status === 201) {
                updateTableList();
                console.log(response.data.message)
                setNotification({ message: response.data.message, status: "success" })
                reset();
            }

        } catch (error) {
            setNotification({ message: error.response.data.message, status: "error" })
        }

    }

    return (
        <div className='w-[400px] h-auto rounded-3xl border-3 bg-gray-100 p-6 space-y-6 shadow-lg '>
            <div className='flex justify-between items-center text-xl font-bold'>
                <h2 className='text-blue-500'>Create Table</h2>
                <button onClick={()=>setOpenCreate(false)} className='text-gray-500 hover:text-red-600 cursor-pointer'>&#10006;</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3 text-sm '>
                <input className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' type="text" placeholder='Name...' {...register("name")} />
                < select className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400' {...register("type")}>
                    <option value="">Select Type</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
                <p className='text-red-500'>
                    {errors.name?.message ||errors.type?.message }
                </p>

                <button className='mx-auto w-[50%] bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 
                    hover:w-[70%] transition-all duration-700 cursor-pointer'>Create</button>

            </form>
            

        </div>



    )
}