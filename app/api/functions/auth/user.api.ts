import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
export const GetUserFunction = async() => {
    try{
        const token = localStorage.getItem("user_token");
        const response = await axiosInstance.get(endPoints.auth.user, {
            headers: {
                "x-access-token": token ? token : ""
            }
        });
        const result = response?.data
        return result
    }catch(error){
        return (error)
    }

}