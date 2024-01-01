import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import Members from "../Members";
import { Toaster } from "@/components/ui/toaster";
import useFetchMemberInfo from "@/hooks/useFetchMemberInfo";
import { useEffect } from "react";
import { socket } from "@/lib/utils";

export default function Dashboard() {
    const { tab } = useParams();
    const { data } = useFetchMemberInfo();
    useEffect(() => {
        if (data) {
            socket.auth = { userId: data._id };
            socket.connect()
        }
        return () => {
            socket.disconnect()
        }
    }, [data])
    return (
        <div>
            <Header />
            {tab === "members" && <Members />}
            <Toaster />
        </div>
    )
}
