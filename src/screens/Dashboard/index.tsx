import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import useFetchUser from "@/hooks/useFetchUser";
import { socket } from "@/lib/utils";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
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
            <Outlet />
            <Toaster />
        </div>
    )
}
