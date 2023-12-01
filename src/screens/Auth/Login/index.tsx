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
import { LoginFormSchema, LoginFromSchemaType } from "@/validation";
import { NavLink } from "react-router-dom";
import AuthLayout from "@/components/Auth/AuthLayout";


export default function Login() {

    const form = useForm<LoginFromSchemaType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: LoginFromSchemaType) {
        console.log(values);
    }

    return (
        <AuthLayout>
            <div className="mb-8">
                <h1 className="font-bold text-2xl">Login</h1>
                <p className="text-sm text-gray-300">
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
                    <Button type="submit" className="w-full">Submit</Button>

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
