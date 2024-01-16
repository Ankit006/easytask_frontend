import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { backendAPI } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import GroupList from "./GroupList";
import useSecurePage from "@/hooks/useSecurePage";
import { useToast } from "@/components/ui/use-toast";
import { Oval } from "react-loader-spinner";

export default function AddGroupModel() {
    const [showGroupDialog, setShowGroupDialog] = useState(false);
    const [groupName, setGroupName] = useState("");
    const { companyId } = useParams();
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const mutation = useMutation<unknown, AxiosError<{ error: string }>>({
        mutationFn: () =>
            axios
                .post(backendAPI.group(companyId), { name: groupName })
                .then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", companyId] })
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: mutation.error?.response?.data.error
            })
        }

    });


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        mutation.mutate()
    }

    useSecurePage({ isError: mutation.isError, error: mutation.error })



    return (
        <div>
            <Button onClick={() => setShowGroupDialog(true)}>
                <FaPlus />
                <span className="ml-1">Add Group</span>
            </Button>
            <div>
                <Dialog
                    open={showGroupDialog}
                    onOpenChange={() => {
                        setShowGroupDialog(false);
                    }}
                >
                    <DialogContent className="max-h-[500px] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add groups</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="flex items-center space-x-2" >
                            <Input
                                placeholder="Group name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                autoComplete="name"
                                required
                            />
                            <Button className="w-24">
                                {mutation.isPending ? <Oval
                                    visible={true}
                                    height={20}
                                    width={20}
                                    color="#ffffff"
                                    secondaryColor="##a78bfa"
                                /> : "Add Group"}
                            </Button>
                        </form>
                        <GroupList />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
