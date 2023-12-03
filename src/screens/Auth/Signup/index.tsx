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
import { SignUpFormValidation, SignupValueType } from "@/validation";
import axios, { AxiosError } from "axios";
import { backendAPI } from "@/constants";
import { useMutation } from "@tanstack/react-query"
import AuthLayout from "@/components/Auth/AuthLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner"
import { useToast } from "@/components/ui/use-toast";


export default function Signup() {

    const { toast } = useToast()
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (values: SignupValueType) => {
            return axios.post(backendAPI.signup, values)
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
            navigate("/")
        }
    })

    const form = useForm<SignupValueType>({
        resolver: zodResolver(SignUpFormValidation),
        defaultValues: {
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: SignupValueType) {
        mutation.mutate(values)
    }


    return (
        <AuthLayout>
            <div className="mb-8">
                <h1 className="font-bold text-2xl">Signup</h1>
                <p className="text-sm text-gray-600 font-semibold">
                    Please enter details below to Signup
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={mutation.isPending} type="submit" className="w-full">
                        {mutation.isPending ? <Circles height={20} width={20} color="#FFFFFF" /> : "Submit"}
                    </Button>
                </form>
            </Form >
            <p className="text-sm mt-4 text-center">
                Already have an account ? {" "}
                <NavLink to={"/login"} className="text-primary font-semibold">
                    Login
                </NavLink>
            </p>
        </AuthLayout>
    );
}
