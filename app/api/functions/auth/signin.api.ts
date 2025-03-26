import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { ISignin } from "@/interface/interface";
 export const SigninFunction = async (formData : ISignin) => {
    try{
        const response = await axiosInstance.post(endPoints.auth.login, formData);
        const result = response?.data
        console.log(result)
        return result;
    }catch(error){
        return (error)
    }
 }