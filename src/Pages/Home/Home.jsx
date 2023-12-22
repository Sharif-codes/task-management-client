import { Link } from "react-router-dom";
import banner from "../../assets/vecteezy_note-taking-or-minutes-of-meeting-conclusion-or-summary_5925084.jpg";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Home = () => {
    const {user}=useContext(AuthContext)
    return (
        <div className="hero w-cover md:min-h-screen min-h-64 mt-5 " style={{ backgroundImage: `url(${banner})`}} >
            <div className="hero-overlay bg-opacity-10 rounded-xl"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md " data-aos="flip-left">
                    <h1 className="text-2xl md:text-4xl font-bold text-primary">Lets Make Your To-do</h1>
                    {/* <p className="text-center text-gray-700">Manage Yout Task Now</p> */}
                    <Link to= "/dashboard"><button className="btn btn-primary mt-2 md:mt-5">Let’s Explore</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;