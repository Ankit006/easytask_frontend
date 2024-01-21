import { useToast } from "@/components/ui/use-toast";
import { backendAPI } from "@/constants";
import useSecurePage from "@/hooks/useSecurePage";
import { IGroup } from "@/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IoMdClose } from "react-icons/io";

interface Props {
    group: IGroup;
    companyId: string | undefined;
    memberId: string | undefined;
}

export default function MemberGroupCard({ group, companyId, memberId }: Props) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const removeGroupMutation = useMutation<
        unknown,
        AxiosError<{ error: string }>
    >({
        mutationFn: () =>
            axios.put(backendAPI.removeMemberFromGroup(companyId), {
                groupId: group._id,
                memberId,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["groups", companyId, memberId],
            });
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: err.response?.data.error,
            });
        },
    });

    useSecurePage({
        error: removeGroupMutation.error,
        isError: removeGroupMutation.isError,
    });

    return <div
        className={`flex items-center space-x-2 ${removeGroupMutation.isPending ? "bg-red-400" : "bg-gray-100"
            } px-4 py-1 rounded-2xl text-xs`}
    >
        {" "}
        <button onClick={() => removeGroupMutation.mutate()} disabled={removeGroupMutation.isPending}>
            {" "}
            <IoMdClose />
        </button>
        <span>{group.name}</span>
    </div>;
}
