

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
const PrivateRoute = ({children}) => {
    const location= useLocation()
    const {user,loading}=useContext(AuthContext)
    if(loading)
    {
        return <progress></progress>
    }
    if(user)
    {
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace='true'></Navigate>
};

export default PrivateRoute;