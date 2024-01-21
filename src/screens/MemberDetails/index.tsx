import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { backendAPI } from "@/constants";
import useSecurePage from "@/hooks/useSecurePage";
import { resizeImage } from "@/lib/utils";
import { IMember } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router-dom";
import MemberDetailsSkeleton from "./components/MemberDetailsSkeleton";
import placeholderProfileImg from "/placeholder-profile.svg";
import MemberGroups from "./components/MemberGroups";
export default function MemberDetails() {
    const { memberId, companyId } = useParams();

    const { data, isError, error, isLoading } = useQuery<
        IMember,
        AxiosError<{ error: string }>
    >({
        queryKey: ["memberDetail", companyId, memberId],
        queryFn: () =>
            axios
                .get(backendAPI.memberData(companyId, memberId))
                .then((res) => res.data),
        enabled: !!memberId && !!companyId,
    });
    useSecurePage({ isError, error });
    if (isLoading) {
        return <MemberDetailsSkeleton />;
    }
    return (
        <div className="container mx-auto mt-8">
            {data && (
                <div>
                    <div className="flex space-x-4">
                        <Avatar className="  w-20 h-20">
                            <AvatarImage
                                src={
                                    data.profilePic
                                        ? resizeImage(data.profilePic.url, 150, 150)
                                        : placeholderProfileImg
                                }
                                alt={data.firstName}
                            />
                            <AvatarFallback>{data.firstName}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-sm text-gray-800 font-semibold">
                                {data.firstName} {data.lastName}
                            </h1>
                            <p className=" text-gray-500 text-sm mt-2 flex items-center space-x-1">
                                <MdEmail /> <span>{data.email}</span>
                            </p>
                            <p className=" text-gray-500 text-sm flex items-center space-x-1 ">
                                <FaPhone /> <span>{data.phoneNumber}</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <MemberGroups memberId={data._id} companyId={companyId} />
                    </div>
                </div>
            )}
        </div>
    );
}
