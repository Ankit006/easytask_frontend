import { useToast } from "@/components/ui/use-toast";
import { backendAPI } from "@/constants";
import { ICompany } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Circles } from "react-loader-spinner";
import { FaPlus } from "react-icons/fa";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateCompanyFormDialog } from "./components/CreateCompanyFormDialog";
import { useState } from "react";
import randomColor from "randomcolor";
import { resizeImage } from "@/lib/utils";
import Center from "@/components/global/Center";
import { Toaster } from "@/components/ui/toaster"
import { NavLink } from "react-router-dom";

export default function Companies() {
    const { toast } = useToast();
    const [openCompanyFormDialog, setOpenCompanyFormDialog] = useState(false);
    const { isLoading, isError, error, data } = useQuery<ICompany[], AxiosError>({
        queryKey: ["companies"],
        queryFn: async () => {
            const res = await axios.get(backendAPI.company);
            return res.data;
        },
    });

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
        toast({
            variant: "destructive",
            title: errorMessage.error,
        });
    }

    return (
        <div>
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
                        data.length > 0 &&
                        data.map((company) => (
                            <NavLink key={company._id} to={`/dashboard/${company._id}`}>
                                <TooltipProvider delayDuration={200} >
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {company.logo ? <img
                                                src={resizeImage(company.logo.url, 100, 100)}
                                                alt={company.name}
                                                height={60}
                                                width={60}
                                                className="rounded-full object-contain"
                                            /> : <div className={`w-16 h-16 rounded-full relative`} style={{ backgroundColor: randomColor() }}>
                                                <Center>
                                                    <span className="text-lg font-semibold capitalize">{company.name[0]}</span>
                                                </Center>
                                            </div>}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{company.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </NavLink>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
}
