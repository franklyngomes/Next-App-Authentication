import axiosInstance from "../../axios/axios";
import { endPoints } from "../../endpoints/endPoints";

export const Service = async () => {
        const response = await axiosInstance.get(endPoints.cms.services);
        console.log(response?.data?.data)
        return response?.data?.data
}