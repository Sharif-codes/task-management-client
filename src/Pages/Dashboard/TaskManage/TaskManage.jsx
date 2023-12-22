// import React, { useState } from 'react';

// const Tabs = () => {
//   const [activeTab, setActiveTab] = useState('ongoing'); // Set the default active tab

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
   
//   };

//   const getTabStyle = (tab) => {
//     return activeTab === tab
//       ? { color: '#7F00FF', borderColor: '#7F00FF' } // Change color dynamically for the active tab
//       : {};
//   };

//   return (
//     <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
//       <ul className="flex flex-wrap -mb-px justify-center gap-4">
//         <li className="me-2">
//           <a
//             href="#"
//             className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
//               activeTab === 'todo' ? 'active' : ''
//             }`}
//             onClick={() => handleTabClick('todo')}
//             style={getTabStyle('todo')}
//           >
//             To-do
//           </a>
//         </li>
//         <li className="me-2">
//           <a
//             href="#"
//             className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
//                 activeTab === 'ongoing' ? 'active' : ''
//               }`}
//             onClick={() => handleTabClick('ongoing')}
//             style={getTabStyle('ongoing')}
//           >
//             Ongoing
//           </a>
//         </li>
//         <li className="me-2">
//           <a
//             href="#"
//             className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
//               activeTab === 'completed' ? 'active' : ''
//             }`}
//             onClick={() => handleTabClick('completed')}
//             style={getTabStyle('completed')}
//           >
//             Completed
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Tabs;
import React, { useEffect, useState } from 'react';
import useTasks from '../../../Hooks/useTasks';
import Section from './Section';

const TaskManage = () => {
  const [tasks,refetch]= useTasks()
  console.log("task list", tasks);

  const [todos,setTodos]=useState([])
  const [ongoing,setOngoing]=useState([])
  const [complete,setComplete]=useState([])

  useEffect(()=>{
    const ftodos= tasks?.filter((task)=> task.status==="todo");
    const fOngoing= tasks?.filter((task)=> task.status==="ongoing");
    const fComplete= tasks?.filter((task)=> task.status==="complete");

    setTodos(ftodos)
    setOngoing(fOngoing)
    setComplete(fComplete)
  },[tasks])
  const statusList = ["todo", "ongoing","complete"]
  return (
    <div className='flex gap-16'>
      {statusList.map((status,index)=><Section key={index} status={status}tasks={tasks} todos={todos} ongoing={ongoing} complete={complete} refetch={refetch}></Section> )}
    </div>
    
  );
};

export default TaskManage;