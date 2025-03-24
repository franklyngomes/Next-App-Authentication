import axiosInstance from "@/api/axios/axios";

export const UpdateProductFunction = async ({id, formData}: {id: string, formData: FormData}) => {
    const url = `https://tureappapiforreact.onrender.com/api/update/product/${id}`;
    const token = localStorage.getItem("user_token");
    const response = await axiosInstance.put(url, formData, {
      headers: {
        "x-access-token" : token ? token : "",
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    return response;
};
