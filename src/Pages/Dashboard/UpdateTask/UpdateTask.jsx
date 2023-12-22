import { useLoaderData, useLocation, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import DatePicker from 'react-datepicker';

const UpdateTask = () => {
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const [task, setTask] = useState([]);
    const location = useLocation();
    const data = location.state;
    
    useEffect(() => {
        axiosPublic.get(`/taskUpdate/${data}`)
            .then(res => setTask(res.data))
            .catch(error => console.error("Error fetching task:", error));
    }, [axiosPublic, data]);

    const onSubmit = (data) => {
        const title = watch("title");
        const description = watch("description");
        const newDate = selectedDate?.toLocaleDateString(undefined, {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

        const taskData = {
            title,
            description,
            deadline: newDate,
            status: "todo",
            user: user.email,
        };

        // Assuming you have a task ID property like task._id
        const taskId = task._id;

        axiosPublic.patch(`/taskUpdate/${taskId}`, taskData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Task Updated");
                }
            })
            .catch(error => console.error("Error updating task:", error));
    };

    return (
        <div>
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
                    defaultValue={task?.title}
                   

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
                    defaultValue={task.description}

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

            <button type="submit" className="btn btn-primary mt-5">Update Task</button>
        </form>
        </div>
    );
};

export default UpdateTask;