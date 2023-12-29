import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { QueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { IUser } from "@/model";
import { useToast } from "@/components/ui/use-toast";
import { backendAPI } from "@/constants";
import useSecurePage from "@/hooks/useSecurePage";
import { Oval } from "react-loader-spinner";
export default function AddMemberModal() {
    const queryClient = new QueryClient();
    const { companyId } = useParams();
    const { toast } = useToast()
    const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState({
        isError: false,
        error: {} as AxiosError<{ error: string }>
    });
    const [user, setUser] = useState<IUser & { isMember: boolean } | undefined>()
    const [fetchingUser, setFetchingUser] = useState(false)

    useSecurePage({
        isError: error.isError,
        error: error.error
    })

    async function fetchEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFetchingUser(true)
        try {
            const res = await queryClient.fetchQuery({
                queryKey: ["searchUser", companyId, searchText],
                queryFn: () => axios.get(backendAPI.searchUsers(companyId), {
                    params: {
                        email: searchText
                    }
                }).then(res => res.data)
            })
            setUser(res);
            setFetchingUser(false)
        } catch (err) {
            setFetchingUser(false)
            const axiosErr = err as AxiosError<{ error: string }>;
            if (axiosErr.status === HttpStatusCode.Unauthorized) {
                setError({
                    isError: true,
                    error: axiosErr
                })
            } else {
                toast({
                    variant: "destructive",
                    title: axiosErr.response?.data.error
                })
            }
        }
    }

    return (
        <div>
            <Button onClick={() => setShowAddMemberDialog(true)}>
                <FaPlus />
                <span className="ml-1">Add Member</span>
            </Button>
            <Dialog
                open={showAddMemberDialog}
                onOpenChange={() => setShowAddMemberDialog(false)}
            >
                <DialogContent className="max-h-[500px] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add Member</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={fetchEmail}>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="email"
                                placeholder="Search by email"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                name="email"
                                autoComplete="email"
                                required
                            />
                            <Button className="w-20" type="submit" variant={"secondary"} disabled={fetchingUser}>
                                {!fetchingUser ? "Search" : <Oval
                                    visible={true}
                                    height={30}
                                    width={30}
                                    color="#884dee"
                                    secondaryColor="##a78bfa"
                                />}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
