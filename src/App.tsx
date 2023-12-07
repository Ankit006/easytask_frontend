import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

export default function App() {
    return (
        <div className="w-screen h-screen">
            <Outlet />
            <Toaster />
        </div>
    )
}
