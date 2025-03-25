import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { ICreate } from "@/interface/interface";

export const CreateFunction = async (formData : ICreate) => {
  const token = localStorage.getItem("user_token")
  const response = await axiosInstance.post(endPoints.cms.create, formData, {
    headers:{
      "x-access-token" : token ? token : ""
    }
  });
  return response;
};
