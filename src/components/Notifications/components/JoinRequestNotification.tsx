import { IJoinRequestNotification } from "@/model";
import placeholderCompanyImg from "/placeholder-company.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resizeImage } from "@/lib/utils";

interface Props {
    requestNotfication: IJoinRequestNotification;
}

export default function JoinRequestNotification({ requestNotfication }: Props) {

    s



    return (
        <div className="w-full ">
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
            <div className="flex items-center justify-end space-x-3">
                <button className="text-xs">Cancel</button>
                <button className="text-blue-700 text-xs underline">Accept</button>
            </div>
        </div>
    );
}
