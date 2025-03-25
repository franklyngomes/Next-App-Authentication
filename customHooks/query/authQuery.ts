import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SignupFunction } from "@/app/api/functions/auth/signup.api";
import { SigninFunction } from "@/app/api/functions/auth/signin.api";
import { VerifyOtpFunction } from "@/app/api/functions/auth/verifyOtp.api";
import { ResetPasswordFunction } from "@/app/api/functions/auth/resetPassword.api";
import { GetUserFunction } from "@/app/api/functions/auth/user.api";
import { useCookies } from "react-cookie";

export const SignupQuery = () => {
    const [cookies, setCookie] = useCookies(["user_token"]);
    return useMutation({
        mutationFn: SignupFunction,
        onSuccess: (res) => {
            if(res.status === true){
                setCookie("user_token", res.token, { path: "/", secure: true });
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
    const [cookies, setCookie] = useCookies(["user_token"]);
    return useMutation({
        mutationFn: SigninFunction,
        onSuccess: (res) => {
            if(res.status === true){
                setCookie("user_token", res.token, { path: "/", secure: true });
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