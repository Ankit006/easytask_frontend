import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginFormSchema, LoginFromValueType } from "@/validation";
import { NavLink, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/Auth/AuthLayout";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { backendAPI } from "@/constants";
import { Circles } from "react-loader-spinner"

export default function Login() {
    const { toast } = useToast();
    const navigate = useNavigate();


    const mutation = useMutation({
        mutationFn: (values: LoginFromValueType) => {
            return axios.post(backendAPI.login, values);
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.response?.data as { error: string }
            toast({
                variant: "destructive",
                title: errorMessage.error,
            })
        },
        onSuccess: () => {
            toast({
                title: "Signup successful"
            })
            navigate("/companies")
        }
    })

    const form = useForm<LoginFromValueType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: LoginFromValueType) {
        mutation.mutate(values)
    }

    return (
        <AuthLayout>
            <div className="mb-8">
                <h1 className="font-bold text-2xl">Login</h1>
                <p className="text-sm text-gray-600">
                    Please enter details below to login
                </p>
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={mutation.isPending} type="submit" className="w-full">
                        {mutation.isPending ? <Circles height={20} width={20} color="#FFFFFF" /> : "Submit"}
                    </Button>

                </form>
            </Form>
            <p className="text-sm mt-4 text-center">
                Don't have an account ? {" "}
                <NavLink to={"/signup"} className="text-primary font-semibold">
                    Register
                </NavLink>
            </p>
        </AuthLayout>
    );
}
