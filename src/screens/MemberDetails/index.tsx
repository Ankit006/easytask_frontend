import { backendAPI } from "@/constants";
import useSecurePage from "@/hooks/useSecurePage";
import { IMember } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom"

export default function MemberDetails() {
    const { memberId, companyId } = useParams();

    const { data, isError, error } = useQuery<IMember, AxiosError<{ error: string }>>({
        queryKey: ["memberDetail", companyId, memberId],
        queryFn: () => axios.get(backendAPI.memberData(companyId, memberId)).then(res => res.data),
        enabled: !!memberId && !!companyId
    })
    useSecurePage({ isError, error })
    console.log(data)
    return (
        <div className="container mx-auto mt-81">index</div>
    )
}
