import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { ISignin } from "@/interface/interface";
 export const SigninFunction = async (formData : ISignin) => {
    try{
        const response = await axiosInstance.post(endPoints.auth.login, formData);
        const result = response?.data
        return result;
    }catch(error){
        return (error)
    }
 }