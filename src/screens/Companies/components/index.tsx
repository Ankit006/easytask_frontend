import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { backendAPI } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IMutationValues } from "../types";


export function CreateCompanyFormDialog() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const mutation = useMutation({
    mutationFn: (values: IMutationValues) => {
      return axios.post(backendAPI.company, values);
    },
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const postData: IMutationValues = {
      name,
      address,
      country,
      pinCode,
    };
    mutation.mutate(postData);
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Creat company</DialogTitle>
        <DialogDescription>
          Create your company. Click save when you're done
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">Company name</Label>
          <Input
            autoComplete="on"
            id="name"
            value={name}
            className="w-full"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <Label htmlFor="address">Address</Label>
          <Input
            autoComplete="on"
            id="address"
            value={address}
            className="w-full"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <Label htmlFor="country">Country</Label>
          <Input
            autoComplete="on"
            id="country"
            value={country}
            className="w-full"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="mt-2">
          <Label htmlFor="pinCode">Pin code</Label>
          <Input
            autoComplete="on"
            id="pinCode"
            value={pinCode}
            className="w-full"
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
