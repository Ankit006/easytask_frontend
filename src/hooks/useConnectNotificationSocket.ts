import { IJoinRequestNotification, IUser } from "@/model";
import { useEffect } from "react";
import { socket } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function useConnectNotificationSocket(user: IUser | undefined) {
  const queryClinet = useQueryClient();
  const { toast } = useToast();
  useEffect(() => {
    if (user) {
      socket.auth = { userId: user._id };
      socket.on(`notification`, (args: IJoinRequestNotification) => {
        if (args.type === "JOIN_REQUEST") {
          toast({
            title: "Join Request",
            description: `${args.companyDetail.companyName} sents a join request`,
          });
          queryClinet.invalidateQueries({ queryKey: ["notifications"] });
        }
      });
      socket.connect();
    }
    return () => {
      socket.off(`notification`);
      socket.disconnect();
    };
  }, [user, toast, queryClinet]);
}
