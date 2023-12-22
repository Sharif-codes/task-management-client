import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const Profile = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className="space-y-3">
           
                <div className="w-56 mx-auto" >
                    <img  src={user?.photoURL} alt="" />
                </div>
                <div className="mx-auto">
                    <p className="text-center text-xl font-semibold">{user.displayName}</p>
                    <p className="text-center text-xl font-semibold">{user.email}</p>
                </div>
           
        </div>
    );
};

export default Profile;