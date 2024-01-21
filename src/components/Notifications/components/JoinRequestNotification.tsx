import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { backendAPI } from "@/constants";
import useRemoveNotfication from "@/hooks/useRemoveNotification";
import useSecurePage from "@/hooks/useSecurePage";
import { resizeImage } from "@/lib/utils";
import { IJoinRequestNotification } from "@/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IoIosClose } from "react-icons/io";
import placeholderCompanyImg from "/placeholder-company.svg";
interface Props {
    requestNotfication: IJoinRequestNotification;
}

export default function JoinRequestNotification({ requestNotfication }: Props) {
    const mutation = useRemoveNotfication(requestNotfication._id);
    const { toast } = useToast();
    const queryClient = useQueryClient()
    const joinMutation = useMutation<unknown, AxiosError<{ error: string }>>({
        mutationFn: async () => {
            const res = await axios
                .post(backendAPI.joinCompany, {
                    companyId: requestNotfication.companyDetail.companyId,
                    notificationId: requestNotfication._id
                });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] })
            queryClient.invalidateQueries({ queryKey: ["notifications"] })
            toast({
                title: `You are joined`
            })

        },
        onError: () => {
            toast({
                variant: "destructive",
                title: joinMutation.error?.response?.data.error,
            });
        },

    });

    useSecurePage({ error: joinMutation.error, isError: joinMutation.isError });

    return (
        <div className="w-full ">
            <div className="flex justify-end">
                <button onClick={() => mutation.mutate()}>
                    <IoIosClose />
                </button>
            </div>
            <h1 className="text-sm font-semibold mb-4 text-primary">Join Request</h1>
            <div className="flex items-start space-x-2">
                <Avatar className=" w-10 h-10">
                    <AvatarImage
                        src={
                            requestNotfication.companyDetail.companyLogo
                                ? resizeImage(
                                    requestNotfication.companyDetail.companyLogo.url,
                                    40,
                                    40
                                )
                                : placeholderCompanyImg
                        }
                        alt={requestNotfication.companyDetail.companyName}
                    />
                    <AvatarFallback>
                        {requestNotfication.companyDetail.companyName}
                    </AvatarFallback>
                </Avatar>
                <h3 className="capitalize text-sm font-semibold">
                    {requestNotfication.companyDetail.companyName}
                </h3>
            </div>
            <div className="flex justify-end">
                <button className="text-blue-700 text-xs underline" onClick={() => joinMutation.mutate()}>Accept</button>
            </div>
        </div>
    );
}
