import useFetchNotifications from "@/hooks/useFetchNotifications";
import { MdOutlineNotifications } from "react-icons/md";
import Center from "../global/Center";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NotificationCard from "./components/NotificationCard";

export default function Notifications() {
    const { data } = useFetchNotifications();

    return (
        <div>
            {data && (
                <div className="relative w-8 h-8  border border-gray-400 rounded-md bg-gray-50 py-2">
                    <Popover>
                        <PopoverTrigger>
                            <Center>
                                <div className="text-lg text-gray-800">
                                    <MdOutlineNotifications />
                                </div>
                            </Center>
                        </PopoverTrigger>
                        {data.length > 0 ? (
                            <PopoverContent className="min-h-[400px] max-h-[80%] overflow-y-auto " align="end">
                                {data.map((notification) => (
                                    <div key={notification._id} className="border-b border-gray-200 py-4">
                                        <NotificationCard notification={notification} />
                                    </div>
                                ))}
                            </PopoverContent>
                        ) : (
                            <PopoverContent className="min-h-[400px] max-h-[80%] overflow-y-auto " align="end">
                                <Center>
                                    <p className="text-sm">No notifcation 😕</p>
                                </Center>
                            </PopoverContent>
                        )}
                    </Popover>
                </div>
            )}
        </div>
    );
}
