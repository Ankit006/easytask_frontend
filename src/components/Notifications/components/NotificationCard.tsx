import { IJoinRequestNotification } from "@/model";
import JoinRequestNotification from "./JoinRequestNotification";

interface Props {
    notification: IJoinRequestNotification;
}

export default function NotificationCard({ notification }: Props) {
    function renderNotification() {
        if (notification.type === "JOIN_REQUEST") {
            return <JoinRequestNotification requestNotfication={notification} />;
        } else {
            return <></>;
        }
    }

    return <div>{renderNotification()}</div>;
}
