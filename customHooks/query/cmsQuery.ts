import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { ListFunction } from "@/api/functions/cms/list.api";
import { CreateFunction } from "@/api/functions/cms/create.api";
import { DeleteFunction } from "@/api/functions/cms/delete.api";
import { SingleItemFunction } from "@/api/functions/cms/singleItem.api";
import { UpdateProductFunction } from "@/api/functions/cms/update.api";

export const ListQuery = () => {
  return useQuery({
    queryKey: ["List"],
    queryFn: ListFunction,
  });
};
export const CreateQuery = () => {
  const { queryClient } = useGlobalHooks();
  return useMutation({
    mutationFn: CreateFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["List"] });
    },
  });
};
export const DeleteQuery = () => {
  const { queryClient } = useGlobalHooks();
  return useMutation({
    mutationFn: DeleteFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["List"] });
    },
  });
};
export const SingleItemQuery = (id: string) => {
  return useQuery({
    queryKey: ["SingleItem"],
    queryFn: () => SingleItemFunction(id),
  });
};
// export const UpdateQuery = () => {
//     const { queryClient } = useGlobalHooks();

//     return useMutation({
//         mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
//             UpdateProductFunction({ id, formData }),

//         onSuccess: (_data, variables) => {
//             const {id} = variables;
//             queryClient.invalidateQueries({ queryKey: ["List"] });
//             queryClient.invalidateQueries({ queryKey: ["SingleItem", id] });

//             // Force refetching to ensure updated data is loaded
//             queryClient.refetchQueries({ queryKey: ["SingleItem", id] });
//         }
//     });
// };

export const UpdateQuery = () => {
  const { queryClient } = useGlobalHooks();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      UpdateProductFunction({ id, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["List"] });
      queryClient.invalidateQueries({ queryKey: ["SingleItem"] });
    },
  });
};
