import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { ISignup } from "@/interface/interface";

export const SignupFunction = async (formData: ISignup) => {
    try{
        const response = await axiosInstance.post(endPoints.auth.register, formData)
        const result = response?.data
        return result;
    }catch(error){
        return error
    }
}