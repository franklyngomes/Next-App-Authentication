import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export const CreateFunction = async (formData : any) => {
  const token = localStorage.getItem("user_token")
  const response = await axiosInstance.post(endPoints.cms.create, formData, {
    headers:{
      "x-access-token" : token ? token : ""
    }
  });
  return response;
};
