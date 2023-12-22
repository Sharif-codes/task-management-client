import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../Pages/Dashboard/Profile/Profile";
import TaskManage from "../Pages/Dashboard/TaskManage/TaskManage";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../Pages/Dashboard/AddTask/AddTask";
import UpdateTask from "../Pages/Dashboard/UpdateTask/UpdateTask";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        }
      ]
    },
    {
        path:"/signup",
        element: <Signup></Signup>
    },
    {
      path: "/login",
      element:<Login></Login>
    },
    {
      path: "dashboard",
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children:[
        {
          index:true,
          element: <TaskManage></TaskManage>

        },
        {
          path: "allTask",
          element: <TaskManage></TaskManage>
        },
        {
          path: "profile",
          element: <Profile></Profile>
        },
        {
          path: "addTask",
          element: <AddTask></AddTask>
        },
        {
          path: "updateTask",
          element: <UpdateTask></UpdateTask>,
          // loader: ({ params }) => fetch(`http://localhost:5000/taskUpdate/${params.id}`)
        }
      ]

    }
  ]);

export default router;