import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { IVerifyOtp } from "@/interface/interface";
export const VerifyOtpFunction = async(formData : IVerifyOtp) => {
    try{
        const response = await axiosInstance.post(endPoints.auth.verify_otp, formData);
        const result = response?.data
        return result
    }catch(error){
        return (error)
    }

}