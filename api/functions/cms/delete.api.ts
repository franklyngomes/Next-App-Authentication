import axiosInstance from "../../axios/axios";
import { endPoints } from "../../endpoints/endPoints";

export const DeleteFunction = async (id: string) => {
  const token =  localStorage.getItem("user_token");
  const response = await axiosInstance.delete(`${endPoints.cms.delete}${id}`, {
    headers: {
      "x-access-token": token ? token : "",
    },

  });
  return response;
};