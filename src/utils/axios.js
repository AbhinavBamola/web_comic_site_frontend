import axios from "axios";


const instance=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
     withCredentials: true // important for sending cookies (like JWT tokens)
});

export default instance;