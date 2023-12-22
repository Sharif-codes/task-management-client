import axios from "axios";


const useAddUser = (user) => {
    axios.post('http://localhost:5000/addUser',user)
    .then(res=> console.log(res))
};

export default useAddUser;