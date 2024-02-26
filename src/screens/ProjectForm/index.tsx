import { useForm } from "react-hook-form";
import { createProjectFormSchema } from "./validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AiFillSave } from "react-icons/ai";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { backendAPI } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import useSecurePage from "@/hooks/useSecurePage";
import { Circles } from "react-loader-spinner";
import { IProject } from "@/model";
import { useEffect } from "react";

export default function ProjectForm() {
    const { companyId, projectId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const projectData = useQuery<IProject, AxiosError<{ error: string }>>({
        queryKey: ["project", projectId],
        queryFn: () =>
            axios
                .get(`${backendAPI.project(companyId)}/${projectId}`)
                .then((res) => res.data),
        enabled: !!companyId && !!projectId,
    });


    function handleAPICall(data: z.infer<typeof createProjectFormSchema>) {
        if (!projectId) {
            return axios.post(backendAPI.project(companyId), data).then((res) => res.data)
        } else {
            return axios.put(`${backendAPI.project(companyId)}/${projectId}`, data).then(res => res.data)
        }
    }

    const mutation = useMutation<
        { message: string },
        AxiosError<{ error: string }>,
        { data: z.infer<typeof createProjectFormSchema> }
    >({
        mutationFn: ({ data }) => handleAPICall(data),
        onSuccess: (res) => {
            toast({
                title: res.message,
            });
            queryClient.invalidateQueries({ queryKey: ["projects", companyId] })
            !projectId && navigate(-1);
        },
        onError: (err) => {
            toast({
                variant: "destructive",
                title: err.response?.data.error,
            });
        },
    });

    useSecurePage({ isError: mutation.isError, error: mutation.error });
    useSecurePage({ isError: projectData.isError, error: projectData.error });

    const form = useForm<z.infer<typeof createProjectFormSchema>>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: {
            name: "",
            projectCost: "",
            projectDeadLine: "",
            projectDesc: "",
        },
    });

    useEffect(() => {
        if (projectData.data) {
            form.setValue("name", projectData.data.name);
            form.setValue("projectCost", projectData.data.projectCost);
            form.setValue("projectDeadLine", projectData.data.projectDeadLine);
            form.setValue("projectDesc", projectData.data.projectDesc);
        }
    }, [projectData.data, form]);

    function onSubmit(values: z.infer<typeof createProjectFormSchema>) {
        mutation.mutate({ data: values });
    }

    return (
        <div className="container mx-auto mt-8">
            <Button
                variant={"ghost"}
                className="space-x-2 text-violet-700 mb-8"
                onClick={() => navigate(-1)}
            >
                <IoIosReturnLeft />
                <span>Return</span>{" "}
            </Button>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="projectDesc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="projectCost"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project cost</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="projectDeadLine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project deadline</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="space-x-2 w-40 h-10"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? (
                                <Circles height={20} width={20} color="#FFFFFF" />
                            ) : (
                                <>
                                    <AiFillSave />
                                    <span>{projectId ? "Update" : "Save"} project</span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            <Toaster />
        </div>
    );
}
