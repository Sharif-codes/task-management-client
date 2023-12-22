import { useForm } from "react-hook-form"
import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SlCalender } from "react-icons/sl";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";

const AddTask = () => {
    const {user}= useContext(AuthContext)
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
       
        setSelectedDate(date);
       
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const axiosPublic= useAxiosPublic()
    const onSubmit = (data) => {
        const title= watch("title")
        const description= watch("description")
        const newDate= selectedDate.toLocaleDateString(undefined, {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        const taskData= {title,description, deadline:newDate, status:"todo",user:user.email}
        axiosPublic.post("/addTask",taskData)
        .then(res=>{
            if(res.data.insertedId)
            {

                toast.success("Task Added")
            }
        } )
        console.log(taskData);
    }
    return (
        <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="w-full md:w-1/2">
                <div className='flex justify-between'>
                    <label htmlFor='title' className='block mb-2 text-lg'>
                        Title
                    </label></div>
                <input
                    {...register("title", { required: true })}
                    placeholder="Enter Task Tile"
                    type='text'
                    name='title'
                   

                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                    data-temp-mail-org='0'
                />
                {errors.name && <span>This field is required</span>}
            </div>
            <div className="w-full md:w-1/2">
                <div className='flex justify-between'>
                    <label htmlFor='description' className='block mb-2 text-lg'>
                        Description
                    </label></div>
                <textarea
                    {...register("description", { required: true })}
                    placeholder="Descripton of the task"
                    type='text'
                    name='description'
                    id='email'

                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900'
                    data-temp-mail-org='0'
                />
                {errors.name && <span>This field is required</span>}
            </div>
            <div className="w-full md:w-1/2">
                <div>
                    <h1 className="block mb-2 text-lg">Select a Date</h1>
                    <DatePicker
                        placeholderText="mm/dd/yy"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MMMM d, yyyy"
                    ></DatePicker>
                </div>
                {errors.name && <span>This field is required</span>}
            </div>

            <button type="submit" className="btn btn-primary mt-5">Add Task</button>
        </form></div>
    );
};

export default AddTask;