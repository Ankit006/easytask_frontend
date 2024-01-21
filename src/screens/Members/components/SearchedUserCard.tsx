import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { backendAPI } from "@/constants";
import { resizeImage } from "@/lib/utils";
import { IUser } from "@/model";
import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import placeholderProfileImg from "/placeholder-profile.svg";
import useSecurePage from "@/hooks/useSecurePage";

interface SearchUserCardProps {
    user: IUser & { isMember: boolean };
}

export default function SearchedUserCard({
    user,
}: SearchUserCardProps) {
    const { toast } = useToast()
    const queryClient = new QueryClient()
    const { companyId } = useParams();
    const [error, setError] = useState({
        isError: false,
        error: {} as AxiosError<{ error: string }>
    })
    useSecurePage({
        isError: error.isError,
        error: error.error
    })

    async function sentRequest() {
        try {
            const res = await queryClient.fetchQuery({
                queryKey: ["sendRequest", companyId, user._id],
                queryFn: () => axios.get(backendAPI.sendJoinRequest(companyId), {
                    params: {
                        userId: user._id
                    }
                }).then(res => res.data)
            })
            console.log(res)
        } catch (err) {
            const axiosErr = err as AxiosError<{ error: string }>;
            if (axiosErr.response?.status === HttpStatusCode.Unauthorized) {
                setError({
                    isError: true,
                    error: axiosErr
                })
            } else {
                toast({
                    variant: "destructive",
                    title: axiosErr.response?.data.error
                })
            }
        }
    }




    return (
        <div className="border border-gray-400 rounded-md p-4 flex space-x-4 w-full">
            <Avatar className="w-14 h-14">
                <AvatarImage src={
                    user.profilePic
                        ? resizeImage(user.profilePic.url, 50, 50)
                        : placeholderProfileImg
                } alt={user.firstName} />
                <AvatarFallback>{user.firstName}</AvatarFallback>
            </Avatar>
            <div className="w-full">
                <h1 className="capitalize text-sm font-semibold">{user.firstName}{" "} {user.lastName}</h1>
                <h3 className="text-xs text-gray-400">{user.email}</h3>
                <div className="flex justify-end">
                    <button className="text-primary text-sm font-semibold" onClick={sentRequest}>Send request</button>
                </div>
            </div>
        </div>
    );
}
