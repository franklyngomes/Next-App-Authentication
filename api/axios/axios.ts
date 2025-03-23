import axios from "axios";
import { Cookies } from "react-cookie";

const baseURL = "https://tureappapiforreact.onrender.com/api"

export const axiosInstance = axios.create({
    baseURL,
})
const cookies = new Cookies()

axiosInstance.interceptors.request.use(
    function (config: any){
        const token = cookies.get("token")
        if(token){
            config.headers = config.headers || {}
            config.headers["x-access-token"] = token
        }
        return config;
    },
    function (error){
        return Promise.reject(error)
    }
);
export default axiosInstance