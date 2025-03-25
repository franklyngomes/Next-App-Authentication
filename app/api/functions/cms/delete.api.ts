import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export const DeleteFunction = async (id: string) => {
  const token =  localStorage.getItem("user_token");
  const response = await axiosInstance.delete(`${endPoints.cms.delete}${id}`, {
    headers: {
      "x-access-token": token ? token : "",
    },

  });
  return response;
};