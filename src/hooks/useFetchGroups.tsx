import { backendAPI } from "@/constants";
import { IGroup } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useSecurePage from "./useSecurePage";

interface Props {
    companyId: string | undefined
}


export default function useFetchGroups({ companyId }: Props) {
    const data = useQuery<
        IGroup[],
        AxiosError<{ error: string }>
    >({
        queryKey: ["groups", companyId],
        queryFn: () =>
            axios.get(backendAPI.group(companyId)).then((res) => res.data),
        enabled: !!companyId,
        staleTime: Infinity,
    });

    useSecurePage({ isError: data.isError, error: data.error });

    return data
}
