import React from 'react';
import Header from './Header';
import Task from './Task';
import { useDrop } from 'react-dnd';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Section = ({status, tasks,todos,ongoing,complete,refetch}) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item)=> addItemToSection(item.id),
        collect: (monitor) => ({
          isDragging: !!monitor.isOver()
        })
      }))

    let text= "Todo"
    let bg= "bg-slate-500"
    let taskToMap = todos

    if(status=== "ongoing")
    {
        text= "ongoing"
        bg= "bg-purple-500"
        taskToMap= ongoing
    }
    if(status=== "complete")
    {
        text= "complete"
        bg= "bg-green-500"
        taskToMap= complete
    }
    const axiosPublic= useAxiosPublic()
    const addItemToSection =(id)=>{
        console.log("dropped",id,status);
        axiosPublic.put(`/updateTask/${id}`,{status})
        .then(res=>{
            console.log(res.data)
            refetch()
        } )
    }
    return (
        <div ref={drop} className={`w-64 rounded-md ${isOver ?"bg-slate-400": ""}`}>
            <Header text={text} bg={bg} count={taskToMap?.length}></Header>
            {taskToMap?.length > 0 && taskToMap.map((task,idx)=> <Task key={idx} task={task} tasks={tasks} refet={refetch} ></Task>)}
        </div>
    );
};

export default Section;