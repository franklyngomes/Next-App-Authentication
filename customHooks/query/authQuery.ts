import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SignupFunction } from "@/api/functions/auth/signup.api";
import { SigninFunction } from "@/api/functions/auth/signin.api";
import { VerifyOtpFunction } from "@/api/functions/auth/verifyOtp.api";
import { ResetPasswordFunction } from "@/api/functions/auth/resetPassword.api";
import { GetUserFunction } from "@/api/functions/auth/user.api";

export const SignupQuery = () => {
    return useMutation({
        mutationFn: SignupFunction,
        onSuccess: (res) => {
            if(res.status === true){
                localStorage.setItem("user_token", res.token)
                localStorage.setItem("user_id", res.user?.id)
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    })

}
export const SigninQuery = () => {
    return useMutation({
        mutationFn: SigninFunction,
        onSuccess: (res) => {
            if(res.status === true){
                localStorage.setItem("user_token", res.token)
                localStorage.setItem("user_id", res.user?.id)
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    })
}
export const VerifyOtpQuery = () => {
    return useMutation({
        mutationFn: VerifyOtpFunction,
        onSuccess: (res) => {
            return res
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    })
}
export const ResetPasswordQuery = () => {
    return useMutation({
        mutationFn: ResetPasswordFunction,
        onSuccess: (res) => {
            return res
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    })
}
export const UserQuery = () => {
    return useQuery({
        queryKey: ["User"],
        queryFn: GetUserFunction,
    })
}