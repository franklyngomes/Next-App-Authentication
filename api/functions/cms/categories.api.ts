import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";

export const Categories = async () => {
  const response = await axiosInstance.get(endPoints.cms.categories);
  return response?.data.data;
};
