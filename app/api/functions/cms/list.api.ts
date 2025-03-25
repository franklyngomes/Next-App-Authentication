import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export const ListFunction = async () => {
  const token =  localStorage.getItem("user_token");
  const response = await axiosInstance.get(endPoints.cms.list, {
    headers: {
      "x-access-token": token ? token : "",
    },
  });
  return response?.data?.product;
};
