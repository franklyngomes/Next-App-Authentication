import { useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { Categories } from "@/api/functions/cms/categories.api";
import { Service } from "@/api/functions/cms/services.api";

export const CategoriesQuery = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: Categories,
    })
}
export const ServiceQuery = () => {
    return useQuery({
        queryKey: ["service"],
        queryFn: Service,
    })
}