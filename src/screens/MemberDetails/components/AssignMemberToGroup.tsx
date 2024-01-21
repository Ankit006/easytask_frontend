import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetchGroups from "@/hooks/useFetchGroups";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { z } from "zod";
import { AssignGroupToMemberFormSchema } from "../validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { backendAPI } from "@/constants";
import useSecurePage from "@/hooks/useSecurePage";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    companyId: string | undefined;
    memberId: string | undefined
}

export default function AssignMemberToGroup({ companyId, memberId }: Props) {
    const [showGroupAssignModal, setShowGroupAssignModal] = useState(false);
    const { data } = useFetchGroups({ companyId });
    const queryClinet = useQueryClient();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof AssignGroupToMemberFormSchema>>({
        resolver: zodResolver(AssignGroupToMemberFormSchema),
        defaultValues: {
            groupId: ""
        }
    });


    const mutation = useMutation<{ message: string }, AxiosError<{ error: string }>, { groupId: string }>({
        mutationFn: ({ groupId }) => axios.put(backendAPI.assignMemberToGroup(companyId), {
            memberId,
            groupId
        }).then(res => res.data),
        onSuccess: (res) => {
            queryClinet.invalidateQueries({ queryKey: ["groups", companyId, memberId] })
            toast({
                title: res.message
            })
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error.response?.data.error
            })
        }
    })

    useSecurePage({ isError: mutation.isError, error: mutation.error })


    function onSubmit(data: z.infer<typeof AssignGroupToMemberFormSchema>) {
        mutation.mutate({ groupId: data.groupId });
    }
    return (
        <div>
            <Button onClick={() => setShowGroupAssignModal(true)}>
                <IoMdAdd />
                <span className="ml-2"> Assign group</span>
            </Button>
            <div>
                <Dialog
                    open={showGroupAssignModal}
                    onOpenChange={() => setShowGroupAssignModal(false)}
                >
                    <DialogContent className="max-h-[500px] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Assign groups</DialogTitle>
                        </DialogHeader>
                        {data && data.length > 0 ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
                                    <FormField
                                        control={form.control}
                                        name="groupId"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select group" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {data.map((group) => (
                                                            <SelectItem key={group._id} value={group._id}>
                                                                {group.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Add</Button>
                                </form>
                            </Form>
                        ) : (
                            <p className="text-xs mt-8 text-center text-gray-600">
                                No group available
                            </p>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
