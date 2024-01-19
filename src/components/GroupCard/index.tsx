import { IGroup } from "@/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IoMdClose } from "react-icons/io";
import { toast } from "../ui/use-toast";
import useSecurePage from "@/hooks/useSecurePage";

interface Props {
    group: IGroup;
    removeGroupApi: string;
    companyId: string | undefined;
}

export default function GroupCard({ group, removeGroupApi, companyId }: Props) {
    const queryClient = useQueryClient();

    const mutation = useMutation<unknown, AxiosError<{ error: string }>>({
        mutationFn: () => axios.delete(removeGroupApi).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", companyId] });
        },

        onError: () => {
            toast({
                variant: "destructive",
                title: mutation.error?.response?.data.error,
            });
        },
    });

    useSecurePage({ isError: mutation.isError, error: mutation.error });



    return (
        <div
            className={`flex items-center space-x-2 ${mutation.isPending ? "bg-red-400" : "bg-gray-100"
                } px-4 py-1 rounded-2xl text-xs`}
        >
            {" "}
            <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                {" "}
                <IoMdClose />
            </button>
            <span>{group.name}</span>
        </div>
    );
}
