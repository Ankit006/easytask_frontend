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
import randomColor from "randomcolor";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateCompanyFormDialog } from "./components";

export default function Companies() {
    const { toast } = useToast();
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
            <div className="center max-w-5xl grid grid-cols-6 gap-3">
                <Dialog>
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
                    <CreateCompanyFormDialog />
                </Dialog>
                {data ? (
                    data.length > 0 &&
                    data.map((company) => (
                        <TooltipProvider delayDuration={200} key={company._id}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        className="w-16 h-16 rounded-full relative"
                                        key={company._id}
                                        style={{ backgroundColor: randomColor() }}
                                    >
                                        <p className=" center text-lg font-semibold text-white">
                                            {company.name[0]}
                                        </p>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{company.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
