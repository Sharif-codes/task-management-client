import axios from "axios";

export const saveUser = (user) => {
    axios.post('https://task-management-server-seven-weld.vercel.app/addUser',user)
    .then(res=> console.log(res))
};
