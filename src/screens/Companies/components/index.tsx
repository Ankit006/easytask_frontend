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
import axios from "axios";
import { CreateCompanyFormDialogProps } from "../types";
import { useForm } from "react-hook-form";
import { companyFormValidation, CompanyFormValueType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateCompanyFormDialog({
  setOpenCompanyFormDialog,
}: CreateCompanyFormDialogProps) {


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: FormData) => {
      return axios.post(backendAPI.company, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setOpenCompanyFormDialog(false);
    },
  });

  const form = useForm<CompanyFormValueType>({
    resolver: zodResolver(companyFormValidation),
    defaultValues: {
      name: "",
      address: "",
      country: "",
      pinCode: "",
    },
  });

  function onSubmit(values: CompanyFormValueType) {
    const formData = new FormData();
    type KeyType = keyof CompanyFormValueType;
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as KeyType])
    })
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
