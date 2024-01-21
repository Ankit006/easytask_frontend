import { backendAPI } from "@/constants";
import { IJoinRequestNotification } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useFetchNotifications() {
  const result = useQuery<
    IJoinRequestNotification[],
    AxiosError<{ error: string }>
  >({
    queryKey: ["notifications"],
    queryFn: () => axios.get(backendAPI.notifications).then((res) => res.data),
  });
  return result;
}
