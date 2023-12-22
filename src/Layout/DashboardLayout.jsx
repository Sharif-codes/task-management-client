import { NavLink, Outlet } from "react-router-dom";
import { MdMenu, MdOutlineAddCircleOutline } from "react-icons/md";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { GoTasklist } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

const DashboardLayout = () => {
    const {user,logOut}=useContext(AuthContext)
    const [sidebarVisibility, setSidebarVisibility] = useState(true)
    const toggleSidebar = () => {
        setSidebarVisibility(!sidebarVisibility);
    };
  

    
    return (
        <div>
            <div className="navbar bg-base-100 border-b-2 mb-2">
                <div className="flex-none">
                    {sidebarVisibility? <button onClick={toggleSidebar} className="btn btn-square btn-ghost lg:hidden block">
                    
                        <RxCross2 className="text-2xl"></RxCross2>
                    </button>: <button onClick={toggleSidebar} className="btn btn-square btn-ghost lg:hidden block">
                    
                    <MdMenu className="text-2xl"></MdMenu>
                </button>}
                    
                </div>
                <div className="flex-1 flex items-center">
                <img className="w-10" src="logo-casa.svg" alt="" />
                <p className="ml-2 hidden md:block
                 text-lg md:text-xl font-semibold">Task <span className="text-primary">Manager</span></p>
            </div>
                <div className="flex gap-3">
                
                        <NavLink to="/" >
                           
                            Home</NavLink>
                    
                
                        <NavLink to="/login" onClick={logOut} >
                           
                            Logout</NavLink>
                            <div>
                            <img className="w-11 h-10 rounded-full" src={user?.photoURL} alt="" />
                            </div>
                      
                    
                </div>

            </div>
        <div className="flex">
                {/* sidebar start */}
              
                <div className={`w-64 min-h-screen bg-black text-white lg:block lg:relative ${sidebarVisibility ? 'absolute z-10' : 'hidden'} transition duration-200 ease-in-out`}>
                    <ul className="menu p-4">
                        
                            <>
                                <p className="text-2xl my-5 font-semibold border-2 p-2 rounded-xl">My Dashboard</p>
                                <li>
                                    <NavLink to='/dashboard/allTask' >
                                       <GoTasklist></GoTasklist>
                                        All Task</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addTask' >
                                       <MdOutlineAddCircleOutline></MdOutlineAddCircleOutline>
                                        Add Task
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/profile' >
                                       <CgProfile></CgProfile>
                                        My Profile</NavLink>
                                </li>
                                
                            </> 

                        <div className="divider"></div>
                        <li>
                            <NavLink to="/" >
                                <FaHome></FaHome>
                                Home</NavLink>
                            <NavLink to="/login" onClick={logOut} >
                                <FaSignOutAlt></FaSignOutAlt>
                                Logout</NavLink>
                        </li>

                    </ul>

                </div>
                {/* sidebar end */}
                
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div> 
            </div>
    );
};

export default DashboardLayout;