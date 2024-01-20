import { backendAPI } from "@/constants";
import useSecurePage from "@/hooks/useSecurePage";
import { IGroup } from "@/model";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";

interface Props {
    groups: IGroup[];
    memberId: string;
}

export default function MemberGroups({ groups, memberId }: Props) {
    const { companyId } = useParams();

    const removeMemeberFromGroup = useMutation<
        unknown,
        AxiosError<{ error: string }>
    >({
        mutationFn: (groupId) =>
            axios
                .put(backendAPI.assignMemberToGroup(companyId), {
                    memberId,
                    groupId,
                })
                .then((res) => res.data),
    });

    useSecurePage({
        error: removeMemeberFromGroup.error,
        isError: removeMemeberFromGroup.isError,
    });

    return (
        <div>
            <div className="inline-block">
                <h1 className="text-violet-600 text-sm font-semibold mb-1">Groups</h1>
                <div className="h-[2px] rounded-lg bg-violet-700 w-full"></div>
            </div>

            <div></div>
        </div>
    );
}
