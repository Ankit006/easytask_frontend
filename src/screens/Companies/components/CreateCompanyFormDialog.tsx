import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { backendAPI } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateCompanyFormDialogProps } from "../types";
import { useForm } from "react-hook-form";
import { companyFormValidation, CompanyFormValueType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Circles } from "react-loader-spinner";
import { useToast } from "@/components/ui/use-toast"




export function CreateCompanyFormDialog({
    setOpenCompanyFormDialog,
}: CreateCompanyFormDialogProps) {

    const queryClient = useQueryClient();
    const { toast } = useToast()


    const mutation = useMutation({
        mutationFn: (values: FormData | object) => {
            return axios.post(backendAPI.company, values);
        },
        onSuccess: () => {
            toast({
                title: "Company is created"
            })
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            setOpenCompanyFormDialog(false);
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.response?.data as { error: string };
            toast({
                variant: "destructive",
                title: errorMessage.error,
            })
        }
    });

    const form = useForm<CompanyFormValueType>({
        resolver: zodResolver(companyFormValidation),
        defaultValues: {
            name: "",
            address: "",
            country: "",
            pinCode: "",
            companyLogo: undefined,
        },
    });

    function onSubmit(values: CompanyFormValueType) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("address", values.address);
        formData.append("country", values.country);
        formData.append("pinCode", values.pinCode);
        values.companyLogo && formData.append("file", values.companyLogo);
        mutation.mutate(formData);
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Creat company</DialogTitle>
                <DialogDescription>
                    Create your company. Click save when you're done
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="companyLogo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company logo (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .webp"
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.files ? e.target.files[0] : undefined
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} multiple />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="pinCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pin code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <Circles height={20} width={20} color="#FFFFFF" />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
}
