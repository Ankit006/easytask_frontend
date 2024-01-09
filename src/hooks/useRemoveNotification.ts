import { useToast } from "@/components/ui/use-toast";
import { backendAPI } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useRemoveNotfication(notificationId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation<unknown, AxiosError<{ error: string }>>({
    mutationFn: () => {
      return axios.delete(backendAPI.removeNotification(notificationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast({
        title: mutation.error?.response?.data.error,
      });
    },
  });

  return mutation;
}
