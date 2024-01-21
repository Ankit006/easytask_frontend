import { backendAPI } from "@/constants";
import { IGroup } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useSecurePage from "./useSecurePage";

interface Props {
    companyId: string | undefined;
    memberId: string | undefined
}

export default function useFetchMemberGroups({ companyId, memberId }: Props) {
    const data = useQuery<
        IGroup[],
        AxiosError<{ error: string }>
    >({
        queryKey: ["groups", companyId, memberId],
        queryFn: () =>
            axios
                .get(backendAPI.memberGroupList(companyId, memberId))
                .then((res) => res.data),
        enabled: !!memberId && !!companyId,
        staleTime: Infinity,
    });

    useSecurePage({ error: data.error, isError: data.isError })
    return data

}
