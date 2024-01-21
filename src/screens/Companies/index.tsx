import Center from "@/components/global/Center";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { backendAPI } from "@/constants";
import { ICompany } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Circles } from "react-loader-spinner";
import CompanyList from "./components/CompanyList";
import { CreateCompanyFormDialog } from "./components/CreateCompanyFormDialog";
import useFetchUser from "@/hooks/useFetchUser";
import CompanyHeader from "./components/CompanyHeader";
import useConnectNotificationSocket from "@/hooks/useConnectNotificationSocket.ts"
import useSecurePage from "@/hooks/useSecurePage";
export default function Companies() {
    const [openCompanyFormDialog, setOpenCompanyFormDialog] = useState(false);
    const { isLoading, isError, error, data } = useQuery<ICompany[], AxiosError<{ error: string }>>({
        queryKey: ["companies"],
        queryFn: async () => {
            const res = await axios.get(backendAPI.company);
            return res.data;
        },
    });

    useSecurePage({ isError, error })
    const { data: user } = useFetchUser();

    useConnectNotificationSocket(user);

    if (isLoading) {
        return (
            <div className="center">
                <Circles
                    height={80}
                    width={80}
                    color="#616eff"
                    ariaLabel="circles-loading"
                />
            </div>
        );
    }
    if (isError) {
        const errorMessage = error.response?.data as { error: string };
        if (error.status === HttpStatusCode.Unauthorized) {
            throw new Error("Unauthorized")
        }
        return <Center><span className="capitalize text-red-600">{errorMessage.error}</span></Center>
    }

    return (
        <div>
            <CompanyHeader />
            <div className="center max-w-5xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                <Dialog
                    open={openCompanyFormDialog}
                    onOpenChange={setOpenCompanyFormDialog}
                >
                    <DialogTrigger asChild>
                        <div>
                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className=" w-16 h-16 rounded-full bg-gray-200 relative">
                                            <div className="text-gray-400 center">
                                                <FaPlus />
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Create company</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </DialogTrigger>
                    <CreateCompanyFormDialog
                        setOpenCompanyFormDialog={setOpenCompanyFormDialog}
                    />
                </Dialog>
                <div>
                    {data ? (
                        <CompanyList companyList={data} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
}
