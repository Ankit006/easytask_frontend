import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFetchUser from "@/hooks/useFetchUser";
import placeholderProfileImg from "/placeholder-profile.svg";
import { resizeImage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Notifications from "@/components/Notifications";

export default function CompanyHeader() {
    const { data: userData, isLoading: userDataLoading } = useFetchUser();
    return (
        <div className="py-4 border-b border-gray-300 ">
            <div className="container mx-auto flex justify-end items-center" >
                <div className="flex items-center space-x-4">
                    <Notifications />
                    {userDataLoading && <Skeleton className="w-10 h-10 rounded-full" />}
                    {userData && (
                        <Avatar className="w-10 h-10">
                            <AvatarImage
                                src={
                                    userData.profilePic
                                        ? resizeImage(userData.profilePic.url, 80, 80)
                                        : placeholderProfileImg
                                }
                            />
                            <AvatarFallback>{userData.firstName}</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
        </div>
    );
}
