import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useTasks = () => {
    const {user}=useContext(AuthContext)
    const axiosPublic= useAxiosPublic()
    const {data:tasks,refetch}=useQuery({
        queryKey: ["tasks"],
        queryFn: async ()=>{
            const res= await axiosPublic.get(`/tasks/${user.email}`)
            return res.data
        }
    })
    return [tasks,refetch];
};

export default useTasks;