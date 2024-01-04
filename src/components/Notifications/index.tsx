import useFetchNotifications from "@/hooks/useFetchNotifications";
import { MdOutlineNotifications } from "react-icons/md";
import Center from "../global/Center";

export default function Notifications() {
    const { data } = useFetchNotifications();

    return (
        <div>
            {data && (
                <div className="relative w-8 h-8  border border-gray-400 rounded-md bg-gray-50">
                    {data.length > 0 && (
                        <span className=" absolute w-2 h-2 -right-1 -top-1 rounded-full bg-green-600"></span>
                    )}
                    <Center>
                        <div className="text-lg text-gray-800">
                            <MdOutlineNotifications />
                        </div>
                    </Center>
                </div>
            )}
        </div>
    );
}
