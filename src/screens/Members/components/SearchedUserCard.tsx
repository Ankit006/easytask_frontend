import { resizeImage } from "@/lib/utils";
import { IUser } from "@/model";
import placeholderProfileImg from "/placeholder-profile.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchUserCardProps {
    user: IUser & { isMember: boolean };
}

export default function SearchedUserCard({
    user,
}: SearchUserCardProps) {
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
                    <button className="text-primary text-sm font-semibold">Send request</button>
                </div>
            </div>
        </div>
    );
}
