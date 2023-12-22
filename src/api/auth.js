import axios from "axios";

export const saveUser = (user) => {
    axios.post('http://localhost:5000/addUser',user)
    .then(res=> console.log(res))
};
