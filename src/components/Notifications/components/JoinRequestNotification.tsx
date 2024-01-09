import { IJoinRequestNotification } from "@/model";
import placeholderCompanyImg from "/placeholder-company.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resizeImage } from "@/lib/utils";
import { IoIosClose } from "react-icons/io";
import useRemoveNotfication from "@/hooks/useRemoveNotification";
interface Props {
    requestNotfication: IJoinRequestNotification;
}

export default function JoinRequestNotification({ requestNotfication }: Props) {

    const mutation = useRemoveNotfication(requestNotfication._id);

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
                <h3 className="capitalize text-sm font-semibold">{requestNotfication.companyDetail.companyName}</h3>
            </div>
            <div className="flex justify-end">
                <button className="text-blue-700 text-xs underline">Accept</button>
            </div>
        </div>
    );
}
