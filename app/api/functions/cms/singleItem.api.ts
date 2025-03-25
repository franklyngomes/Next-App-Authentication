import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export const SingleItemFunction = async (id : string) => {
  const token =  localStorage.getItem("user_token");
  console.log(id)
  const response = await axiosInstance.get(`${endPoints.cms.view}${id}`, {
    headers: {
      "x-access-token": token ? token : "",
    },
  });
  return response;
};
