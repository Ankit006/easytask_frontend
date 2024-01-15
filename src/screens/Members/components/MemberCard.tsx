import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IUser } from "@/model";
import placeholderProfileImg from "/placeholder-profile.svg";
import { resizeImage } from "@/lib/utils";

interface Props {
    user: IUser;
}

export default function MemberCard({ user }: Props) {
    return (
        <TableRow>
            <TableCell className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src={
                        user.profilePic
                            ? resizeImage(user.profilePic.url, 80, 80)
                            : placeholderProfileImg
                    } />
                    <AvatarFallback>{user.firstName}</AvatarFallback>
                </Avatar>
                <span>{user.firstName}</span>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>
                <Button>Details</Button>
            </TableCell>
        </TableRow>
    );
}
