import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { ListFunction } from "@/api/functions/cms/list.api";
import { CreateFunction } from "@/api/functions/cms/create.api";
import { DeleteFunction } from "@/api/functions/cms/delete.api";

export const ListQuery = () => {
    return useQuery({
        queryKey: ["List"],
        queryFn: ListFunction,
    })
}
export const CreateQuery = () => {
    const {queryClient} = useGlobalHooks()
    return useMutation({
        mutationFn: CreateFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["List"] });
        }
    })
}
export const DeleteQuery = () => {
    const {queryClient} = useGlobalHooks()
    return useMutation({
        mutationFn: DeleteFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["List"] });
        }
    })
}