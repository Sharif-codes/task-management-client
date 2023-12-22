import axios from "axios";


const useAddUser = (user) => {
    axios.post('https://task-management-server-seven-weld.vercel.app/addUser',user)
    .then(res=> console.log(res))
};

export default useAddUser;