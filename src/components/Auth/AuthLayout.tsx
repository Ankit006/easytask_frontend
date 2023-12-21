import React from "react";
import { Toaster } from "@/components/ui/toaster"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
                <div className="min-w-[400px] border border-slate-300 p-6 rounded-md shadow-md">
                    {children}
                </div>
            </div>
            <Toaster />
        </div>
    )
}
