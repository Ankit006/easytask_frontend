import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import useFetchUser from "@/hooks/useFetchUser";
import { socket } from "@/lib/utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Members from "../Members";

export default function Dashboard() {
    const { tab } = useParams();
    const { data } = useFetchUser();
    useEffect(() => {
        if (data) {
            socket.auth = { userId: data._id };
            socket.on(`notification`, (args) => {
                console.log(args)
            })
            socket.connect()
        }
        return () => {
            socket.off(`notification`)
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
