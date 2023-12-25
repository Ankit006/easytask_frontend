import { backendAPI } from "@/constants"
import { IHeader } from "@/model"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import placeholderProfileImg from "/placeholder-profile.svg"
import ProfileMenu from "./ProfileMenu"
export default function Header() {
    const { companyId } = useParams()
    const { data, isLoading, isError, error } = useQuery<IHeader>({
        queryKey: ["header", companyId],
        staleTime: Infinity,
        enabled: !!companyId,
        queryFn: () => axios.get(backendAPI.header(companyId)).then((res) => res.data)
    })


    return (
        <div className=" py-4 border-b border-gray-300">
            <div className="container mx-auto flex items-center justify-between">
                <nav>
                    <ul className="text-xs text-gray-600 flex items-center space-x-4">
                        <li>Members</li>
                        <li>Projects</li>
                        <li>Chats</li>
                    </ul>
                </nav>
                {isLoading ? <Skeleton className="w-16 h-16 rounded-full" /> : <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src={placeholderProfileImg} alt={data?.firstName} />
                            <AvatarFallback>{data?.firstName}</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    {data && <ProfileMenu header={data} />}
                </Popover>}
            </div>
        </div>
    )
}
