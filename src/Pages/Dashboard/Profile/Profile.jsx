import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useTasks from "../../../Hooks/useTasks";


const Profile = () => {
    const { user } = useContext(AuthContext)
    const [task,refetch]= useTasks()
    return (
        <div className="space-y-3">
           
                <div className="w-56 mx-auto" >
                    <img  src={user?.photoURL} alt="" />
                </div>
                <div className="mx-auto space-y-3 mt-3">
                    <p className="text-center text-xl font-semibold">{user.displayName}</p>
                    <p className="text-center text-xl font-semibold">{user.email}</p>
                    <p className="text-center text-xl font-semibold">Total Task: <span className="text-purple-400">{task?.length}</span> </p>
                </div>
           
        </div>
    );
};

export default Profile;