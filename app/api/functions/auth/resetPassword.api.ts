import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { IResetPassword } from "@/interface/interface";
export const ResetPasswordFunction = async(formData : IResetPassword) => {
    try{
        const token = localStorage.getItem("user_token");
        const response = await axiosInstance.post(endPoints.auth.reset_password, formData, {
            headers: {
                "x-access-token": token ? token : ""
            }
        });
        const result = response?.data
        console.log(result)
        return result
    }catch(error){
        return (error)
    }
}