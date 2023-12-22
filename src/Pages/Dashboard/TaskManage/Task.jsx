import { useDrag } from "react-dnd";
import { TiDeleteOutline } from "react-icons/ti"
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Task = ({ task, tasks, refet }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task?._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    console.log(isDragging);

    const axiosPublic = useAxiosPublic()
    const handleRemove = (id) => {
        axiosPublic.delete(`/deleteTask/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success("Task Deleted Successfully")
                    refet()
                }
            })
    }
    return (
        <div  data-aos="fade-down" ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}>
            <p className="font-semibold">{task?.title}</p>
            <p className="text-sm text-gray-400">{task?.description}</p>
            <p className="text-xs text-orange-400">Deadline: {task?.deadline}</p>
            <button className="absolute bottom-4 right-1 text-slate-400 ml-3" onClick={() => handleRemove(task?._id)}><TiDeleteOutline className="text-2xl text-red-500" /></button>
        </div>
    );
};

export default Task;