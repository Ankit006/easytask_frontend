import { backendAPI } from "@/constants";
import { IUser } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useFetchUser() {
  const result = useQuery<IUser, AxiosError<{ error: string }>>({
    queryKey: ["user"],
    staleTime: Infinity,
    queryFn: () => axios.get(backendAPI.user).then((res) => res.data),
  });
  return result;
}
