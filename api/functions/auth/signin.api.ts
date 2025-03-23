import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
 export const SigninFunction = async (formData : any) => {
    try{
        const response = await axiosInstance.post(endPoints.auth.login, formData);
        const result = response?.data
        return result;
    }catch(error){
        return (error?.response?.data)
    }
 }